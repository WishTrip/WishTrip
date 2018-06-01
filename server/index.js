// import required packages
require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const { scrape } = require("./controllers/web-scraper/scraper");
const { SESSION_SECRET, PORT } = process.env;
const axios = require("axios");

const dbCtrl = require(`${__dirname}/controllers/databaseController`);

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

// HOSTING
app.use(express.static(`${__dirname}/../build)`));
app.get('*', (req, res) => res.sendFile(__dirname, '..', 'index.html'));

//Database Endpoints
// app.get('/api/getData', dbCtrl.getData);
// app.post('/api/changeDummyData', dbCtrl.createUser);
// app.put('/api/updateUsername', dbCtrl.updateUsername);
// app.delete("/api/deleteUser/:id", dbCtrl.deleteUser);

//Real Database Endpoints
// app.post("/api/userData", dbCtrl.userData);
app.get("/api/getUserTrips/:id", dbCtrl.getUserTrips);
app.post("/api/loginUser", dbCtrl.loginUser);
app.post("/api/sendUserInfo", dbCtrl.sendUserInfo);

//Google Maps Endpoint
app.get("/api/userLocation", dbCtrl.userLocation);

//*****************WEB SCRAPER END POINT*****************//
app.get("/api/gettravelinfo", scrape);

app.get("/api/test", (req, res) => {
  axios
    .get(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBpckueoZxbh2f1mLzs_Uk5BzxM2cITWv4&libraries=places"
    )
    .then(response => res.json(response.data))
    .catch(console.log);
});

app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});
