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

const getData = (req, res) => {
  database
    .ref("database")
    .child("user")
    .on("value", snap => {
      console.log(snap.val());
    });
};

module.exports = {
  getData
};
