'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(cors());

// routes

app.get('/location', function(req, res){
  const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
  let url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;
  superagent.get(url).then(whatComesBack => {
    const gpsData = whatComesBack.body;
    const instanceOfGpsData = new GpsData(gpsData[0], req.query.city);

    res.send(instanceOfGpsData);
  });
});

app.get('/weather', function(req, res){
  const weatherData = require('./data/weather.json');
  const weatherArray = [];
  weatherData.data.forEach(day => {
    const instanceOfWeatherData = new WeatherData(day);
    weatherArray.push(instanceOfWeatherData);
  });

  res.send(weatherArray);
});

// callback functions


function GpsData(gpsObj, query){
  this.latitude = gpsObj.lat;
  this.longitude = gpsObj.lon;
  this.formatted_query = gpsObj.display_name;
  this.search_query = query;
}

function WeatherData(weatherObj){
  this.time = weatherObj.datetime;
  this.forecast = weatherObj.weather.description;
}


// error handling and start server
app.use('*', (request, response) => {
  response.status(404).send('The route you are looking for has been disconnected. Please try another.');
});

app.listen(PORT, () => console.log(`Server is up and running on Port: ${PORT}.`));
