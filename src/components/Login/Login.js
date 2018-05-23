import React from "react";
import axios from "axios";
import * as firebase from "firebase";
import {Redirect} from 'react-router-dom';
import {Toaster, Intent, Spinner} from '@blueprintjs/core'
  
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
  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false,
      data: [],
    usernames: [],
    trips: [],
    userInput: "",
    email: "",
    password: "",
    authenticated: false, 
    loading: true
    }
  }
  // state = {
  //   data: [],
  //   usernames: [],
  //   trips: [],
  //   userInput: "",
  //   email: "",
  //   password: "",
  //   authenticated: false
  // };

  authWithEmailPassword(event){
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value
    
    auth.fetchProvidersForEmail(email)
    .then((providers) => {
      if(providers.length === 0) {
        return auth.createUserWithEmailAndPassword(email,password)
      } else if (providers.indexOf("password") === -1) {
        this.loginForm.reset()
       this.toaster.show({intent: Intent.WARNING, message: "Try Alternative login."})
      } else {
       return auth.signInWithEmailAndPassword(email, password)
      }
    })
    .then((user) => {
      if (user && user.email) {
        this.loginForm.reset()
        this.setState({redirect: true})
      }
    })
    .catch((error) => {
      this.toaster.show({intent: Intent.DANGER, message: error.message })
    })



    // console.log("authed with email")
    // console.table([{
    //   email: this.emailInput.value,
    //   password: this.passwordInput.value
    // }])
  }
  componentDidMount() {
    this.removeAuthListener = auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
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
      user ? console.log(user) : console.log("No one logged in");
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
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%"}}>
        <h3> Loading</h3>
        <Spinner/>
        </div>
      )
    }
    if (this.state.redirect === true) {
      return <Redirect to='/home' />
    }
    const { usernames, trips, userInput, data } = this.state;
// console.log(usernames)
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
              auth.createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
              );
              this.setState({ email: "", password: "" });
            }}
          >
            Sign Up
          </button>
        </form>

{/* Test login/signup */}
<div>
  <Toaster ref={(element) => {this.toaster = element}} />
                <form onSubmit={(event) => {this.authWithEmailPassword(event)}} ref={
                  (form) => { this.loginForm = form }}>
        <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
                  <h5>Note</h5>
                  If you don't have an account already, this form will create your account.
                  </div>
                  <label className="pt-label">
                  Email
                  <input style={{width: "100%"}} className="pt-input" name= "email" type="email"
                  ref = {(input) =>  {this.emailInput = input}} placeholder="Email"></input>
                  </label>
                  <label className="pt-label">
                  Password
                  <input style={{width: "100%"}} className="pt-input" name= "password" type="password"
                  ref = {(input) =>  {this.passwordInput = input}} placeholder="password"></input>
                  </label>
                  <input style={{width: "100%"}} type="submit" className="pt-button-intent-primary" 
                  value= "log In"></input>
                  </form>
                  </div>


      </div>
    );
  }
}

export default Login;
