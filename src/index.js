import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyALNeA1bN6DgHDYyWUKhEDCfncCLnkBrpk",
  authDomain: "hexchat-d3a09.firebaseapp.com",
  projectId: "hexchat-d3a09",
  storageBucket: "hexchat-d3a09.appspot.com",
  messagingSenderId: "673698345451",
  appId: "1:673698345451:web:9314f97eb22ab48f4529ae",
  measurementId: "G-9RC5EBZZCN",
});

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{ firebase, auth, firestore }}>
      <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
