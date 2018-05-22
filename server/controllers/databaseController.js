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
    // .child("user")
    .once("value", snap => {
      res.status(200).json(snap.val());
    });
};

const createUser = (req, res) => {
  const { username } = req.body;

  database
    .ref("users")
    .push()
    .set({ userinfo: { username, password: "test" } });

  database.ref("users").once("value", snap => {
    res.status(200).json(snap.val());
  });
};

const updateUsername = (req, res) => {
  const { username, key } = req.body;

  database.ref("users").update({ [`${key}/userinfo/username`]: username });

  database.ref("users").once("value", snap => {
    res.status(200).json(snap.val());
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  database.ref("users").update({ [`${id}`]: null })

  database.ref("users").once("value", snap => {
    res.status(200).json(snap.val());
  });
}

module.exports = {
  getData,
  createUser,
  updateUsername,
  deleteUser
};
