'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(cors());

// routes

app.get('/location', function(req, res){
  const gpsData = require('./data/location.json');
  const instanceOfGpsData = new GpsData(gpsData[0]);

  res.send(instanceOfGpsData);
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


function GpsData(gpsObj){
  this.latitude = gpsObj.lat;
  this.longitude = gpsObj.lon;
  this.formatted_query = gpsObj.display_name;
  this.search_query = 'Lynnwood';
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
