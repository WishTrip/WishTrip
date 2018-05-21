// import required packages
require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const firebase = require("firebase");
const {
  SESSION_SECRET,
  PORT,
  DATABASE_API_KEY,
  DATABASE_AUTH_DOMAIN,
  DATABASE_URL,
  DATABASE_PROJECT_ID,
  DATABASE_STORAGE_BUCKET,
  DATABASE_SENDER_ID
} = process.env;

// Database Configuration
var config = {
  apiKey: DATABASE_API_KEY,
  authDomain: DATABASE_AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: DATABASE_PROJECT_ID,
  storageBucket: DATABASE_STORAGE_BUCKET,
  messagingSenderId: DATABASE_SENDER_ID
};
firebase.initializeApp(config);

const database = firebase.database();
database
  .ref("database")
  .child("user")
  .on("value", snap => {
    console.log(snap.val());
  });

const session = require("express-session");

// Define express invoked as "app"
const app = express();

// Define Port from .env
const port = PORT || 3001;

app.use(json());
app.use(cors());

// Create Session with express-session
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    // cookie: {
    //   maxAge: 3600 * 24 * 7
    // }
  })
);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
