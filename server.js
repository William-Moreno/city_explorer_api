'use strict';

const express = require('express');
const cors = require('cors');
const { response } = require('express');
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

// app.use(express.static('./public'));
// app.get('/home', function(req, res){
//   response.send('./index.html');
// });


// callback functions


function GpsData(gpsObj){
  this.lat = gpsObj.lat;
  this.lon = gpsObj.lon;
  this.formatted_query = gpsObj.display_name;
  this.search_query = 'Lynnwood';

}


// error handling and start server
app.use('*', (request, response) => {
  response.status(404).send('The route you are looking for has been disconnected. Please try another.');
});

app.listen(PORT, () => console.log(`Server is up and running on Port: ${PORT}.`));
