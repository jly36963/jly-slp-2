export const authEndpoint: string = 'https://accounts.spotify.com/authorize';
export const clientId: string = '1eb264741f20409a80d2fc3382824f43';
export const redirectUri: string =
  process.env.NODE_ENV === 'production'
    ? 'https://jly-slp.herokuapp.com/'
    : 'http://localhost:3000/';
export const scopes: Array<string> = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
];
