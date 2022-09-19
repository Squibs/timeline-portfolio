---
slug: '/project/local-weather'
date: '2017-06-07'
title: 'Local Weather'
url: 'https://squibs.github.io/local-weather/'
github: 'https://github.com/Squibs/local-weather'
description: 'A small webpage that displays your local weather in Fahrenheit or Celsius based off of your browser geolocation. Features a dynamic weather icon, to show weather quickly at a glance. Pulls data from the Dark Sky API, which unfortunately no longer accepts new signups.'
---

### Project Information

The second _intermediate front end development_ project I completed while going through the lessons and challenges on freeCodeCamp. For this project I retrieved the information displayed from the [Dark Sky API](https://darksky.net/dev). This API is set to end on March 31st, 2023 so unfortunately this project will no longer work past that date, until I revisit it.

I made the site request for the user's current location to retrieve the geolocation coordinates and retrieve the relevant local weather with those coordinates using the API. I used the built in CSS flexbox for this app instead of [BootStrap](https://getbootstrap.com/) to try out something new. A button is present to switch between Celsius and Fahrenheit.

Originally this project was going to use the [OpenWeatherMap API](https://openweathermap.org/api), however, after setting up all the JavaScript for the API and having everything working, I was not satisfied with the accuracy of the weather I was fetching. I settled on using the _Dark Sky API_ to retrieve weather information. _Dark Sky_ while not having as many currently included weather conditions and various ids or icons for the included weather, I found to be more reliable. I also like the fact that you can view how many API calls you are using, while at the time I did not see an easy way to view that on _OpenWeatherMap_. In the end, I really could have used either API, but in switching, I did learn better techniques for puling information from APIs.
