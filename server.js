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
  let urlLocation = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;
  superagent.get(urlLocation).then(whatComesBack => {
    const gpsData = whatComesBack.body;
    const instanceOfGpsData = new GpsData(gpsData[0], req.query.city);

    res.send(instanceOfGpsData);
  }).catch(() => console.log('Error'));
});

app.get('/weather', function(req, res){
  const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
  let urlWeather = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${req.query.latitude}&lon=${req.query.longitude}&key=${WEATHER_API_KEY}&days=8`;
  superagent.get(urlWeather).then(whatComesBack => {
    const weatherData = whatComesBack.body;
    const weatherArray = weatherData.data.map(function(daysWeather) {
      return new WeatherData(daysWeather);
    });
    res.send(weatherArray);
  }).catch(() => console.log('Error'));


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
