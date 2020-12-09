# City Explorer API

**Author**: William Moreno
**Version**: 1.0.0

## Overview
I build an API server, that provides data for the City Explorer Application. It will allow a user to search for a location, present a map of the location's area, and information about the chosen location. This will be accomplished using data from APIs the server will fetch and manage.

## Getting Started

Open the City Explorer site using https://city-explorer-app-wm.herokuapp.com as the server.

## Architecture

The server is constructed using Node.js

## Change Log

12-07-2020 2:05pm - Repository set-up completed and initial version of server deployed to Heroku.

12-07-2020 6:45pm - Application now has a fully-functioning express server, with a GET route for the location resource.

12-07-2020 7:45pm - Application now has a fully-functioning express server, with a GET route for the weather resource.

12-08-2020 2:25pm - The forEach in the weather callback function has be replaced with a map method.

12-08-2020 3:05pm - Geocode API key applied and /location route callback updated for functionality.

12-08-2020 4:10pm - Weather API key applied and /weather route callback updated for functionality.

12-08-2020 5:15pm - /trail route callback created utilizing Trail API key and a new constructor function. It is now functional.

12-08-2020 5:20pm - Function implemented to handle errors from any API calls.


## Credits and Collaborations

Alan Hung and James Gerstenberger assisted with troubleshooting coding errors.

Nick Magruder assisted with setting up Config Vars on Heroku.

## Observations and Reflections

### Lab 06 - Node, npm and Express

**1. Repository Set Up**

Estimate of time needed to complete:  45 minutes

Start time: 1:00pm

Finish time: 2:05pm

Actual time needed to complete: 1 hour 5 minutes

**2. Locations: As a user of City Explorer, I want to enter the name of a location so that I can see data about the area of interest to me.**

Estimate of time needed to complete:  1 hour

Start time: 4:30pm

Finish time: 6:45pm

Actual time needed to complete: 2 hours 15 minutes

**3. Weather: As a user, I want to request current weather information so that I can learn more about the typical weather patterns in the location I had entered.**

Estimate of time needed to complete:  45 miuntes

Start time: 7:00pm

Finish time: 7:45pm

Actual time needed to complete: 45 minutes

**4. Errors: As a user, I want clear messages if something goes wrong so I know if I need to make any changes or try again in a different manner.**

Estimate of time needed to complete:  30 minutes

Start time: 5:15pm

Finish time: 5:20pm

Actual time needed to complete: 5 minutes

### Lab 07 APIs

**1. Data formatting: As a user, I want the application to provide properly formatted data so that I can view similar data for any location I choose.**

Estimate of time needed to complete:  15 minutes

Start time: 2:15pm

Finish time: 2:25pm

Actual time needed to complete: 10 minutes

**2. Locations: As a user, I want to enter the name of a location so that I do not need to look up the latitude and longitude every time I learn about a new location.**

Estimate of time needed to complete:  30 minutes

Start time: 2:30pm

Finish time: 3:05pm

Actual time needed to complete: 35 minutes

**3. Weather: As a user, I want to request current weather information at any location, so that I can learn more about the typical weather patterns in the area of interest.**

Estimate of time needed to complete:  45 miuntes

Start time: 3:30pm

Finish time: 4:10pm

Actual time needed to complete: 40 minutes

**4. Trails: As a user, I want to request information about trails and campgrounds in the area so that users can explore the location.**

Estimate of time needed to complete:  1 hour

Start time: 4:25pm

Finish time: 5:15pm 

Actual time needed to complete: 50 minutes

### Lab 08 Persistence with a SQL Database

**1. Database: As a user, I want the application to perform quickly, so that I can search for locations frequently and reliably.**

Estimate of time needed to complete:  45 minutes

Start time: 1:50pm

Finish time: 2:50pm

Actual time needed to complete: 1 hour

**2. Server: As a user, I want the application to perform quickly so that I can search for locations frequently and reliably.**

Estimate of time needed to complete: 45 minutes

Start time: 2:55pm

Finish time: 3:30pm

Actual time needed to complete: 35 minutes

**3. Deploy: As a user, I want the application to perform quickly so that I can search for locations frequently and reliably.**

Estimate of time needed to complete:

Start time:

Finish time:

Actual time needed to complete:

**4. *STRETCH*: Server: As a user, I want the application to work with recent results, so that I can see info without the app doing unnecessary API calls.**

Estimate of time needed to complete:

Start time:

Finish time:

Actual time needed to complete: