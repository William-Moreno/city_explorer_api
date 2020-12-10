'use strict';

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const TRAIL_API_KEY = process.env.TRAIL_API_KEY;

const client = new pg.Client(DATABASE_URL);
client.on('error', error => console.error(error));


// middleware
app.use(cors());

// routes

app.get('/location', getLocation);

app.get('/weather', getWeather);

app.get('/trails', getTrails);

// callback functions


function getLocation(req, res){
  client.query('SELECT * FROM location WHERE search_query = $1', [req.query.city])
    .then(data => {
      if(data.rowCount > 0){
        res.send(data.rows[0]);
      } else {
        let urlLocation = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;
        superagent.get(urlLocation).then(locationData => {
          const gpsData = locationData.body;
          const instanceOfGpsData = new GpsData(gpsData[0], req.query.city);

          client.query('INSERT INTO location (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)', [req.query.city, instanceOfGpsData.formatted_query, instanceOfGpsData.latitude, instanceOfGpsData.longitude])
            .then(() =>{
              res.send(instanceOfGpsData);
            });
        }).catch(() => res.status(500).send('Sorry, something went wrong.'));

      }
    });
}

function GpsData(gpsObj, query){
  this.latitude = gpsObj.lat;
  this.longitude = gpsObj.lon;
  this.formatted_query = gpsObj.display_name;
  this.search_query = query;
}

function getWeather(req, res){
  let urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${WEATHER_API_KEY}&days=8`;
  superagent.get(urlWeather).then(weatherInfo => {
    const weatherData = weatherInfo.body;
    const weatherArray = weatherData.data.map(function(forecast) {
      return new WeatherData(forecast);
    });
    res.send(weatherArray);
  }).catch(() => res.status(500).send('Sorry, something went wrong.'));
}

function WeatherData(weatherObj){
  this.time = weatherObj.datetime;
  this.forecast = weatherObj.weather.description;
}

function getTrails(req, res){
  let urlTrail = `https://www.hikingproject.com/data/get-trails?lat=${req.query.latitude}&lon=${req.query.longitude}&maxDistance=25&key=${TRAIL_API_KEY}`;
  superagent.get(urlTrail).then(returnedData => {
    const trailData = returnedData.body.trails;
    const trailArray = trailData.map(function(trail) {
      return new TrailData(trail);
    });
    res.send(trailArray);
  }).catch(() => res.status(500).send('Sorry, something went wrong.'));
}

function TrailData(trailObj){
  this.trail_url = trailObj.url;
  this.name = trailObj.name;
  this.location = trailObj.location;
  this.length = trailObj.length;
  this.condition_date = trailObj.conditionDate.slice(0,10);
  this.condition_time = trailObj.conditionDate.slice(11);
  this.conditions = trailObj.conditionStatus;
  this.stars = trailObj.stars;
  this.star_votes = trailObj.starVotes;
  this.summary = trailObj.summary;
}


// error handling and start server
app.use('*', (request, response) => {
  response.status(404).send('The route you are looking for has been disconnected. Please try another.');
});

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is up and running on Port: ${PORT}.`));
  })
  .catch(error => console.error(error));
