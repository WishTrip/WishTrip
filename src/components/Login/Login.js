import React from "react";
import axios from "axios";
import Background from "../Background/Background";
import { auth } from "../../firebase";
import "./Login.css";

import { connect } from "react-redux";
import userReducer, {
  userLogin,
  sendUserInfo,
  getUserTrips
} from "../../ducks/userReducer";

class Login extends React.Component {
  state = {
    email: "",
    password: ""
  };

  //Firebase Authentication Login
  handleUserLogin = event => {
    event.preventDefault();
    const { email, password } = this.state;

    auth.fetchProvidersForEmail(email).then(providers => {
      if (providers.length) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(response => {
            this.props.userLogin(response.user.email, response.user.uid);
            this.props.getUserTrips(response.user.uid);
            console.log(`I'M IN: ${response.user.uid}`);
          })
          .then(() => (window.location = "/#/trips"))
          .then(
            () =>
              this.props.user.userinfo &&
              this.props.sendUserInfo(this.props.user)
          );
      } else {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(response => {
            this.props.userLogin(response.user.email, response.user.uid);
            this.props.getUserTrips(response.user.uid);
          })
          .then(() => (window.location = "/#/trips"))
          .then(
            () =>
              this.props.user.userinfo &&
              this.props.sendUserInfo(this.props.user)
          );
      }
    });
  };

  handleUserInput = (state, val) => {
    this.setState({ [state]: val });
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <Background />
        {/* <form onSubmit={event => this.handleUserLogin(event)}  ref={form => this.loginForm = form}>
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
        </form> */}

        <div className="login-container">
          <form>
            <div className='input-container'>
              <h3 className='input-title'>Email:</h3>
              <input
                data-cypress-email-input
                required
                type="email"
                value={this.state.email}
                placeholder="Enter Email"
                className="login-input"
                onChange={e => this.handleUserInput("email", e.target.value)}
              />
            </div>
            <div className='input-container'>
              <h3 className='input-title'>Password:</h3>
              <input
                data-cypress-password-input
                required
                type="password"
                value={this.state.password}
                placeholder="Enter Password"
                className="login-input"
                onChange={e => this.handleUserInput("password", e.target.value)}
              />
            </div>
            <button
              data-cypress-submit-login
              className="login-btn"
              onClick={e => this.handleUserLogin(e)}
            >
              Login
            </button>
          </form>
          <p className='login-note'>
            Note: If you do not already have an account, then this will create one for you!
          </p>
        </div>

        {/* <button
          data-cypress-button-logout
          onClick={() =>
            auth.signOut().then(() => (window.location = "/#/home"))
          }
        >
          logout
        </button> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.userReducer };
};

export default connect(mapStateToProps, {
  userLogin,
  sendUserInfo,
  getUserTrips
})(Login);
