---
slug: '/project/drum-machine'
date: '2022-10-04'
title: 'Drum Machine'
url: 'https://drum-machine.squibs.vercel.app/'
github: 'https://github.com/squibs/drum-machine#drum-machine'
description: 'A drum machine. Created to mimic the electronic musical instruments that are largely used to create synthetic percussive sounds and other audio.'
---

### Project Information

The final _Front End Development Library_ project I completed while going through the lessons and challenges on freeCodeCamp. For this project I created a drum machine.

As with the rest of the other freeCodeCamp projects or challenges I was presented with several _user stories_ that I had to meet in order to consider this project complete. These _user stories_ did change how I would have tackled this project myself, but I feel it is good practice to accommodate to various demands or requests that help shape the project when it is finished.

Some of these _user stories_ being:

- Being able to have the keyboard correspond to each individual drum pad.
- At least 9 clickable drum pad elements, with the inner text being related to that of the keyboard keys that trigger them.
- Having a string of text be displayed, depending on the action the user takes, inside of a 'display'.

I went a bit further and followed their example project, adding in a sound bank button as well as a volume slider, and adding in additional features of my own. I included a pitch and pan slider (or knob depending on screen size), to change how the sound is being played.

This project once again reminded me of just how much extra effort has to go into one specific thing, iOS Safari, just to get everything working correctly. I really wanted this project to work correctly across all sorts of devices, and iOS in general just would not cooperate with me. Many of the issues I ran into had to do with iOS on this project. Sounds would not play correctly, only one sound at a time would play, or the triggered audio would just no longer play at all. All of these issues only happened on iOS, and I spent a while trying to come up with my own solution. In the end I had to rely on **Howler.JS**, and suddenly my iOS issues were somewhat gone.
