---
slug: '/project/twitch-streamers'
date: '2017-06-23'
title: 'Twitch Streamer Status'
url: 'https://squibs.github.io/twitch-streamers/'
github: 'https://github.com/Squibs/twitch-streamers#twitch-streamer-status'
image: '../../images/timelinePage/screenshot-twitch-streamers.png'
imageAlt: 'Image of Website:'
broken: true
---

### Project Information

slug: url for the generated page to reside at on the timeline site
date: project completion date
title: name of the project
url: link to functional site of the project
github: link to the github page of the project
image: replace the iframe with an image of site
imageAlt: text to go above the displayed image; text is sticky so when you scroll it stays
broken: true to include 'deprecated' in front of site link

Everything is pretty optional to include. Mostly just need slug, date, and title.

!! You can leave off url if you only want to use an image this will remove the project url from the side bar and from the site button below

!! You can leave off github as well, this removes it from the side bar and from below the project

!! broken is optional, one of them has to have it however, otherwise graphql throws a fit. left it on twitch-streamers; this goes for any of these really; each one must at least be on one of the markdown pages.
