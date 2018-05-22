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

// FUNCTIONS
const getData = (req, res) => {
  database
    .ref("users")
    .child("user")
    .on("value", snap => {
      res.status(200).json(snap.val());
    });
};

const updateUser = (req, res) => {
  // const { username } = req.body;

  // database
  //   .ref("users")
  //   .child('user')
  //   .child("userinfo")
  //   .set({ username });
};

module.exports = {
  getData,
  updateUser
};
