import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyDYlhZ_ufGfYs5pnSurlDD7zOCKN9LfUfg',
  databaseURL: 'http://treki-hacktiv8-2018.firebaseio.com',
  projectId: 'treki-hacktiv8-2018'
});

export const database = firebase.database();