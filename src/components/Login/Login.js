import React from "react";
import axios from "axios";
import Background from "../Background/Background";
import { auth } from "../../firebase";
import "./Login.css";

import { connect } from "react-redux";
import userReducer, { userLogin, sendUserInfo } from "../../ducks/userReducer";

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
              console.log('signed in:', response)
              auth.onAuthStateChanged(user => {
                console.log(user)
                this.props.userLogin(user.email, user.uid);
                user
                  ? (this.setState({ redirect: true, user: user }),
                    (window.location = "/#/home"))
                  : console.log("No one logged in");
              });
            })
            .then(() => (this.props.user && (this.props.user.trips.length && this.props.user.userinfo)) && this.props.sendUserInfo(this.props.user))
            .catch(error => console.log(error));
        }
        //Create New User sign in
        else {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
              auth.onAuthStateChanged(user => {         
                this.props.userLogin(user.email, user.uid);
                user
                  ? [
                      this.props.user.trips[0] &&
                        this.props.sendUserInfo(this.props.user),
                      this.setState({ redirect: true, user: user }),
                      (window.location = "/#/trips")
                    ]
                  : console.log("No one logged in");
              });
            });
        }
      })
      .then(response => {
        if (auth.currentUser) {
          this.loginForm.reset();
        }
      })
      .catch(error => {
        var errorCode = error.code;
        console.log(errorCode);
      });
  }

  render() {
    console.log(this.props);
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
            // onClick={() => this.props.user.trips[0] && this.props.sendUserInfo()}
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

const mapStateToProps = state => {
  return { ...state.userReducer };
};

export default connect(mapStateToProps, { userLogin, sendUserInfo })(Login);
