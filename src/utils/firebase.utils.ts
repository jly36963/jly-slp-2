import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAtGAoisyQq6gmKZci9vt96cWlh-3e2t8U',
  authDomain: 'jly-slp-2.firebaseapp.com',
  databaseURL: 'https://jly-slp-2.firebaseio.com',
  projectId: 'jly-slp-2',
  storageBucket: 'jly-slp-2.appspot.com',
  messagingSenderId: '679571847226',
  appId: '1:679571847226:web:2d48a9c245557f5da6dd03',
  measurementId: 'G-0VD66R5YC6',
};

// intitialize
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// export/init
export const auth = firebase.auth();
// export library
export default firebase;

// fb + next (initialize)
// https://github.com/zeit/next.js/issues/1999

// auth properties and methods
// https://firebase.google.com/docs/reference/js/firebase.auth.Auth#index

// currentUser (User) properties and methods
// https://firebase.google.com/docs/reference/js/firebase.User
