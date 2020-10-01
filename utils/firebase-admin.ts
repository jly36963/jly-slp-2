// imports
import admin, { ServiceAccount } from 'firebase-admin';
import config from '../config/firebase-admin.config';

// app
const serviceAccount = <ServiceAccount>config;
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// auth
export const auth = app.auth();
