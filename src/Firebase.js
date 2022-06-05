import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDLKc1z1hZNJbC-tcbLBrAm4rLWA3aeGKU",
    authDomain: "letschat-df4d9.firebaseapp.com",
    projectId: "letschat-df4d9",
    storageBucket: "letschat-df4d9.appspot.com",
    messagingSenderId: "610698182849",
    appId: "1:610698182849:web:5e1bd48acb0569ecd79440"
  }).auth();