// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjv5PNvlbFjcG22cw4Pq3OFZ2a7mRFyRo",
  authDomain: "convin-e7b74.firebaseapp.com",
  projectId: "convin-e7b74",
  storageBucket: "convin-e7b74.appspot.com",
  messagingSenderId: "1056520430663",
  appId: "1:1056520430663:web:3692f0e8c30bda183e3d62",
  measurementId: "G-MK2J2HCS7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);