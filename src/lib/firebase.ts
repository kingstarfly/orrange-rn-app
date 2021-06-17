import firebase from "firebase/app";
import Constants from "expo-constants";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyAAwOSRAib-NMv9AQWKVupL6nwY02kan7o",
  authDomain: "tootle-33156.firebaseapp.com",
  projectId: "tootle-33156",
  storageBucket: "tootle-33156.appspot.com",
  messagingSenderId: "360544977568",
  appId: "1:360544977568:web:ee047466a68703d74b3fc5",
  measurementId: "G-3BNSH3GE0V",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();
const auth = firebase.auth();
const firestore = firebase.firestore();
if (__DEV__) {
  console.log("Switching to local Firebase instance...");
  const origin =
    Constants.manifest.debuggerHost?.split(":").shift() || "localhost";

  firestore.useEmulator(origin, 4123);
}
const firebaseApp = firebase;

export { database, auth, firestore, firebaseApp };
