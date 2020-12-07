'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(cors());

// routes


// error handling and start server
app.use('*', (request, response) => {
  response.status(404).send('The route you are looking for has been disconnected. Please try another.');
});

app.listen(PORT, () => console.log(`Server is up and running on Port: ${PORT}.`));
