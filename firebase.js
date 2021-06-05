import firebase from 'firebase/app'

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAAwOSRAib-NMv9AQWKVupL6nwY02kan7o",
    authDomain: "tootle-33156.firebaseapp.com",
    projectId: "tootle-33156",
    storageBucket: "tootle-33156.appspot.com",
    messagingSenderId: "360544977568",
    appId: "1:360544977568:web:ee047466a68703d74b3fc5",
    measurementId: "G-3BNSH3GE0V"
};

firebase.initializeApp(firebaseConfig);

export var database = firebase.database();
export var auth = firebase.auth();
export var firestore = firebase.firestore();

