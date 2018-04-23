import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDYlhZ_ufGfYs5pnSurlDD7zOCKN9LfUfg",
  authDomain: "treki-hacktiv8-2018.firebaseapp.com",
  databaseURL: "https://treki-hacktiv8-2018.firebaseio.com",
  projectId: "treki-hacktiv8-2018",
  storageBucket: "treki-hacktiv8-2018.appspot.com",
  messagingSenderId: "131605323820"
});

export const database = firebase.database();

export const auth = firebase.auth()
export const storage = firebase.storage()
