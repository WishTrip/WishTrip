const firebase = require("firebase");
const {
  REACT_APP_DATABASE_API_KEY,
  REACT_APP_DATABASE_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_DATABASE_PROJECT_ID,
  REACT_APP_DATABASE_STORAGE_BUCKET,
  REACT_APP_DATABASE_SENDER_ID
} = process.env;

var config = {
  apiKey: REACT_APP_DATABASE_API_KEY,
  authDomain: REACT_APP_DATABASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_DATABASE_PROJECT_ID,
  storageBucket: REACT_APP_DATABASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_DATABASE_SENDER_ID
};
firebase.initializeApp(config);

const database = firebase.database();

// FUNCTIONS
const getData = (req, res) => {
  database
    .ref("users")
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
