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

const loginUser = (req, res) => {
  const {} = req.body;

  database
    .ref(`users/${userID}`)
    .child("userinfo")
    .set({ username, email, firstName, lastName });

  database.ref("users").once("value", snap => {
    res.status(200).json(snap.val());
  });
};

const sendUserInfo = (req, res) => {
  const { user } = req.body;
  console.log(req.body.user.trips)

  database
    .ref(`users/${user.userinfo.uid}`)
    .child('userinfo')
    .set({ email: user.userinfo.email })

  database
    .ref(`users/${user.userinfo.uid}`)
    .child('trips')
    .push()
    .set({ tripBudget: user.trips[0].tripBudget, tripLocation: user.trips[0].tripLocation, days: user.trips[0].days })
}

module.exports = {
  loginUser,
  sendUserInfo
};


























// const userData = (req, res) => {
//   const { useremail, userID } = req.body;

//   database
//     .ref("users")
//     .push()
//     .set({ userinfo: { email: 'ablackshear7820@gmail.com'}, trips: {tripOne: 'trip'} });
//     // .set({ userinfo: { email: useremail }, trips: {tripOne: 'trip'} });

//   database.ref("users").on("child_added", snap => {
//     console.log(snap.val());
//   });
// };

// FUNCTIONS
// const getData = (req, res) => {
//   database
//     .ref("users")
//     .once("value", snap => {
//       res.status(200).json(snap.val());
//     });
// };

// const createUser = (req, res) => {
//   const { username } = req.body;

//   database
//     .ref("users")
//     .push()
//     .set({ userinfo: { username, password: "test" } });

//   database.ref("users").once("value", snap => {
//     res.status(200).json(snap.val());
//   });
// };

// const updateUsername = (req, res) => {
//   const { username, key } = req.body;

//   database.ref("users").update({ [`${key}/userinfo/username`]: username });

//   database.ref("users").once("value", snap => {
//     res.status(200).json(snap.val());
//   });
// };

// const deleteUser = (req, res) => {
//   const { id } = req.params;

//   database.ref("users").update({ [`${id}`]: null })

//   database.ref("users").once("value", snap => {
//     res.status(200).json(snap.val());
//   });
// }

// module.exports = {
//   getData,
//   createUser,
//   updateUsername,
//   deleteUser
// };
