import React from "react";
import axios from "axios";
import * as firebase from "firebase";

// FIREBASE CONFIG
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

const auth = firebase.auth();

class Login extends React.Component {
  state = {
    data: [],
    usernames: [],
    trips: [],
    userInput: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    axios
      .get("/api/getData")
      .then(res => {
        const usernameArr = this.state.usernames;
        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));

    auth.onAuthStateChanged(user => {
      user ? console.log(user.uid) : console.log("No one logged in");
    });
  }

  handleUserInput = e => {
    this.setState({ userInput: e.target.value });
  };

  handelUsernameEdit = e => {
    this.setState({ userInput: e.target.value });
  };

  handleUpdateUsername = (username, key) => {
    axios
      .put("/api/updateUsername", { username, key })
      .then(res => {
        this.setState({ usernames: [] });

        const usernameArr = this.state.usernames.slice();

        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }

        this.setState({ data: res.data, usernames: usernameArr });
      })
      .catch(err => console.log(err));
  };

  createUser = username => {
    axios
      .post("/api/changeDummyData", { username })
      .then(res => {
        this.setState({ usernames: [] });

        const usernameArr = this.state.usernames.slice();

        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }

        this.setState({ data: res.data, usernames: usernameArr });
      })
      .catch(err => console.log(err));
  };

  deleteUser = key => {
    axios
      .delete(`/api/deleteUser/${key}`)
      .then(res => {
        this.setState({ usernames: [] });

        const usernameArr = this.state.usernames.slice();

        for (let key in res.data) {
          usernameArr.push({ key, username: res.data[key].userinfo.username });
        }

        this.setState({ data: res.data, usernames: usernameArr });
      })
      .catch(err => console.log(err));
  };

  handleUserSignUp = (input, e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { usernames, trips, userInput, data } = this.state;

    let users = this.state.usernames.map((cur, ind) => (
      <div key={cur.key}>
        {cur.username}
        <input onChange={this.handelUsernameEdit} />
        <button
          onClick={() => {
            this.handleUpdateUsername(userInput, cur.key);
            this.setState({ userInput: "" });
          }}
        >
          Edit
        </button>
        <button onClick={() => this.deleteUser(cur.key)}>Delete</button>
      </div>
    ));

    return (
      <div>
        {/* <div>
          <input onChange={this.handleUserInput} />
          <button onClick={() => this.createUser(userInput)}>
        <div>
          <input data-cypress-add-input onChange={this.handleUserInput} />
          <button
            data-cypress-button-add
            onClick={() => this.createUser(userInput)}
          >
            Add Username
          </button>
        </div>
        {users} */}
        <form>
          <input
            value={this.state.email}
            type="email"
            placeholder="Email"
            onChange={e => this.handleUserSignUp("email", e)}
          />
          <input
            value={this.state.password}
            type="password"
            placeholder="Password"
            onChange={e => this.handleUserSignUp("password", e)}
          />
          <button
            onClick={() => {
              auth.signInWithEmailAndPassword(
                this.state.email,
                this.state.password
              );
              this.setState({ email: "", password: "" });
            }}
          >
          {/* <button
            onClick={() => {
              auth.createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
              );
              this.setState({ email: "", password: "" });
            }}
          > */}
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
