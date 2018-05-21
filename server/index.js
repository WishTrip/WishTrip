// import required packages
require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const { SESSION_SECRET, PORT } = process.env;

const session = require("express-session");
// define express invoked as "app"
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
