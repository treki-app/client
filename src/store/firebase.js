import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDY1hZ_ufGfYs5pnSur1DD7zOCKN9LfUfg',
  databaseURL: 'http://treki-hacktiv8-2018.firebaseio.com',
  projectId: 'treki-hacktiv8-2018'
});

export const database = firebase.database();