import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyBb4WMEJkAOznEQZoInxwaTKTnnLUO2LLk',
  authDomain: 'agorailegal.firebaseapp.com',
  databaseURL: 'https://agorailegal.firebaseio.com',
  storageBucket: 'agorailegal.appspot.com',
  // messagingSenderId: '325170618285',
});

// start offline, only go online when necessary to prevent too many simultaneous connections
firebase.database().goOffline();

export default firebase;
