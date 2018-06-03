const firebase = require("firebase");
const axios = require("axios");

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
  // databaseURL: `https://${REACT_APP_DATABASE_URL}`,
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_DATABASE_PROJECT_ID,
  storageBucket: REACT_APP_DATABASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_DATABASE_SENDER_ID
};
firebase.initializeApp(config);
const database = firebase.database();

const loginUser = (req, res) => {
  database
    .ref(`users/${userID}`)
    .child("userinfo")
    .set({ username, email, firstName, lastName });

  database.ref("users").once("value", snap => {
    res.status(200).json(snap.val());
  });
};

const sendUserInfo = (req, res) => {
  const { user, uid, email } = req.body;

  database
    .ref(`users/${uid || user.userinfo.uid}`)
    .child("userinfo")
    .set({ email: email || user.userinfo.email });

  if(user.trips[0]) {
    database
    .ref(`users/${uid || user.userinfo.uid}/trips`)
    .child(`${user.trips[0].name}`)
    .set({
      name: user.trips[0].name,
      origin: user.trips[0].origin,
      destination: user.trips[0].destination,
      starting: user.trips[0].starting,
      ending: user.trips[0].ending,
      budget: user.trips[0].budget,
      notes: user.trips[0].notes,
      days: user.trips[0].days
    });
  }

    database.ref(`users/${uid || user.userinfo.uid}`).once("value", snap => {
      // console.log(snap.val())
      res.status(200).json(snap.val().trips);
    });

  //----------- CHECK TRIP CODE -------------//
  // database.ref("users").once("value", snap => {
  //   var tripsArr = [];
  //   snap.forEach(childSnap => {
  //     tripsArr.push(childSnap.val().trips);
  //   });
  //   tripsArr.map(cur => {
  //     cur["My Trip"] &&
  //       cur["My Trip"]["tripBudget"] == 1231 &&
  //       console.log(cur["My Trip"]);
  //   });
  // });

  //----------- TRIP NAME EXISTS LOGIC -------------//
  // database.ref(`users/${user.userinfo.uid}/trips`).once("value", snap => {
  //   snap.val()[user.trips[0].tripName]
  //     ? database
  //         .ref(`users/${user.userinfo.uid}/trips`)
  //         .child(`${user.trips[0].tripName}`)
  //         // .push()
  //         .set({
  //           tripBudget: user.trips[0].tripBudget,
  //           tripLocation: user.trips[0].tripLocation,
  //           tripName: user.trips[0].tripName,
  //           tripNotes: user.trips[0].tripNotes,
  //           days: user.trips[0].days
  //         })
  //     : database
  //         .ref(`users/${user.userinfo.uid}/trips`)
  //         .child(`${user.trips[0].tripName}`)
  //         // .push()
  //         .set({
  //           tripBudget: user.trips[0].tripBudget,
  //           tripLocation: user.trips[0].tripLocation,
  //           tripName: user.trips[0].tripName,
  //           tripNotes: user.trips[0].tripNotes,
  //           days: user.trips[0].days
  //         });
  // });
};

const userLocation = (req, res) => {
  const { lat, long, attraction } = req.query;

  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=5000&keyword=${attraction}&key=${
        process.env.REACT_APP_PLACES_KEY
      }`
    )
    .then(response => res.status(200).json(response.data))
    .catch(err => res.status(500).json(err));
};

const getUserTrips = (req, res) => {
  database.ref("users").once("value", snap => {
    let obj = snap.val();
    res.status(200).json({ userinfo: obj[req.params.id], uid: req.params.id });
  });
};

module.exports = {
  loginUser,
  sendUserInfo,
  userLocation,
  getUserTrips
};
