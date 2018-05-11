import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCCWartaMl9Bspv-iEPSyP1kh8Lz0KYDkQ",
    authDomain: "doodle-93fd7.firebaseapp.com",
    databaseURL: "https://doodle-93fd7.firebaseio.com",
    projectId: "doodle-93fd7",
    storageBucket: "doodle-93fd7.appspot.com",
    messagingSenderId: "587727329325"
};

firebase.initializeApp(config);

export const db = firebase.database();
export const articlesRef = db.ref('/articles');
export const storageRef = firebase.storage();
export const fbAuth = firebase.auth();