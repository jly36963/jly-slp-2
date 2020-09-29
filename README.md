# NEXT EXPRESS SPOTIFY

This application is used to programmatically interact with Spotify and Genius APIs to 1) determine what the user is listening to on Spotify, 2) control playback, 3) fetch/display lyrics from Genius (if desired and a match is found).

Users must authenticate with Spotify and grant authorization to this app.

## Setup

- `npm i`

### Develop

- `npm run dev`

### Prod

- `npm run build`
- `npm run build:server`
- `npm start`

## Tools

- react
- next.js
- express
- mui
- typescript

## Issues

- marquee / ticker issue
- retry lyric fetch if parentheses / feature

## Todo

- firebase auth
- postgres
- middleware (auth)
- replace spotify auth logic (redirect -> backend requests) if possible.
- background img/gradient/blur
- refresh token / save in LS
- song position (slider)
- loading/spinner while waiting for playback action

## Spotify Response Structure

```js
const songItemStructure = {
  album: {
    href: String, // api endpoint
    images: [{ url: String, height: Number }],
  },
  artists: [
    {
      name: String,
      spotify: String, // url to open in spotify
      id: String,
      href: String, // api endpoint
    },
  ],
  id: String, // spotify id
  name: String, // song title
  duration_ms: Number,
};
```
