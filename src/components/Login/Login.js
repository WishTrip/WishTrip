import React from "react";
import axios from "axios";
import Background from "../Background/Background";
import { auth } from "../../firebase";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  //Firebase Authentication Login
  authWithEmailPassword(event) {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    //Email In-Use Check
    auth
      .fetchSignInMethodsForEmail(email)
      .then(providers => {
        if (providers.length >= 1) {
          //Sign in with Existing Email & Password
          auth
            .signInWithEmailAndPassword(email, password)
            .then(response => {
              auth.onAuthStateChanged(user => {
                user
                  ? [
                      this.setState({ redirect: true, user: user }),
                      // console.log(
                      //   "Registered User: ",
                      //   user.email,
                      //   user.uid,
                      //   this.state.redirect
                      // ),
                      (window.location = "/#/home")
                    ]
                  : console.log("No one logged in");
              });
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              console.log(errorCode);
            });
        }
        //Create New User sign in
        else {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
              auth.onAuthStateChanged(user => {
                user
                  ? [
                      this.setState({ redirect: true, user: user }),
                      // console.log(
                      //   "New User: ",
                      //   user.email,
                      //   user.uid,
                      //   this.state.redirect
                      // ),
                      (window.location = "/#/home")
                    ]
                  : console.log("No one logged in");
              });
            })
            .then(response2 => {
              //Send user info to database
              const currentUser = auth.currentUser;
              const useremail = auth.currentUser.email;
              const userID = auth.currentUser.uid;
              axios.post("/api/userData", { useremail, userID });
            });
        }
      })
      .then(response => {
        if (auth.currentUser) {
          this.loginForm.reset();
        }
      })
      .then(res => {
        if (this.state.redirect === true) {
          this.props.history.push("/home");
        }
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
      });
  }

  render() {
    return (
      <div>
        <Background />
        <form
          onSubmit={event => {
            this.authWithEmailPassword(event);
          }}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div className="">
            <h5>Note</h5>
            If you don't have an account already, this form will create your
            account.
          </div>
          <label className="">
            Email
            <input
              data-cypress-email-input
              className=""
              name="email"
              type="email"
              ref={input => {
                this.emailInput = input;
              }}
              placeholder="Email"
              onChange={e => this.setState({ email: e.target.value })}
            />
          </label>
          <label className="">
            Password
            <input
              data-cypress-password-input
              className=""
              name="password"
              type="password"
              ref={input => {
                this.passwordInput = input;
              }}
              placeholder="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </label>
          <input
            data-cypress-submit-login
            type="submit"
            className=""
            value="log In"
          />
        </form>
        {/* TEMPORARY LOGOUT BUTTON */}
        <button data-cypress-button-logout onClick={() => auth.signOut()}>
          logout
        </button>
        {/* TEMPORARY LOGOUT BUTTON */}
      </div>
    );
  }
}
export default Login;
