---
slug: '/project/twitch-streamers'
date: '2017-06-23'
title: 'Twitch Streamer Status'
url: 'https://squibs.github.io/twitch-streamers/'
github: 'https://github.com/Squibs/twitch-streamers#twitch-streamer-status'
broken: false # leave here on this file, one of them has to have it
description: 'This is a project where I worked with the Twitch API. It displays a list of streamers that can be filtered to show only the ones that are live or the ones that are offline. The Twitch API is constantly changing, so this is now running off of a freeCodeCamp cached pass-through that may show out of date information.'
---

### Project Information

<p style="text-align: center;"><strong>**None of the information provided in this application is accurate. Site is using mock-data to render channel information and live status.**</strong></p>

A Twitch streamer live-status site I created while going through the intermediate front end development project challenges at freeCodeCamp. This project later got removed from the curriculum, and placed into their later _Coding Interview Prep_ section as a _Take Home Project_.

I've gone back and updated this site several times as Twitch changed their API. Every time they completely changed how information is given out, requiring a lot of rewriting or restructuring of the code I had previously restructured or rewritten. Finally freeCodeCamp provided their own API pass-through, which I then again reworked this project to use. This pass-through was changed to work only with only certain channels and went back or changed to different API URIs.

What you see now for this project is the eight specific channels that this pass-through is providing pseudo / mock-data for. I'm retrieving this information via an XMLHttpRequest (XHR) and storing the retrieved information as a collection of promises to later be used to display channel information and display if a channel is _"live"_ or not.
