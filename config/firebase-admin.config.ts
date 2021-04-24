const config = {
  projectId: process.env.FB_PROJECT_ID,
  privateKeyId: process.env.FB_PRIVATE_KEY_ID,
  privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
  clientEmail: process.env.FB_CLIENT_EMAIL,
  clientId: process.env.FB_CLIENT_ID,
  authUri: process.env.FB_AUTH_URI,
  tokenUrl: process.env.FB_TOKEN_URI,
};

export default config;

// privateKey has the replace method because heroku messes up the config var
// https://stackoverflow.com/a/41044630
