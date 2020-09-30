// imports
import admin from 'firebase-admin';
// app
const projectId = 'jly-slp-2';
const app = admin.initializeApp({ projectId });
// auth
export const auth = app.auth();
