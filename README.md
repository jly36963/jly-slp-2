# NEXT EXPRESS SPOTIFY

This application is used to programmatically interact with Spotify and Genius APIs in order to do the following:

1. determine what the user is listening to on Spotify
2. control playback
3. fetch/display lyrics from Genius (if desired and a match is found)

Users must authenticate through firebase.

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
- firebase
- postgres

## Issues

- marquee / ticker issue
- retry lyric fetch if parentheses / feature

## Todo

- postgres
- replace spotify auth logic (redirect -> backend requests) if possible.
- background img/gradient/blur
- song position (slider)
- loading/spinner while waiting for playback action

## App Structure

- `.next/` where Next's SSR magic happens (dev server, and production build)
- `api/` api routes (src)
- `config/` config files
- `dist/` tsc output (server and api routes)
- `middleware/` middleware for express
- `models/` db models (not implemented yet)
- `public/` static assets
- `src/`
  - `components/` reusable components and partials
  - `images/` images used in app
  - `pages/` route components
  - `theme/` mui themes (with overrides)
  - `utils/` tools used on front-end
- `utils/` tools used on back-end
- `.babelrc` babel config
- `.env` secrets
- `.prettierrc` prettier config
- `dev.env` secrets placeholder
- `docker-compose.yml` local microservice config file (not used yet)
- `next-env.d.ts` auto-generated by Next when using typescript
- `nodemon.json` nodemon config
- `package.json` dependencies and scripts
- `server.js` custom Next server (Express for Api, Next for SSR)
- `tsconfig.json` typescript config for front-end (Next)
- `tsconfig.server.json` typescript config for back-end (Express)

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
