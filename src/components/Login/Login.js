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
import { toggleLogin } from "../../ducks/viewReducer";

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
            this.props.sendUserInfo(this.props.user, response.user.uid, response.user.email)
            this.props.toggleLogin();
          })
          .then(() => this.props.user.trips[0] ? (window.location = "/#/profile") : (window.location = "/#/trips"));
      } else {
        auth
          .createUserWithEmailAndPassword(email, password)
          .then(response => {
            this.props.userLogin(response.user.email, response.user.uid);
            this.props.getUserTrips(response.user.uid);
          })
          .then(() => this.props.user.trips[0] ? (window.location = "/#/profile") : (window.location = "/#/trips"))
          .then(
            () => this.props.toggleLogin(),
            this.props.user.userinfo && this.props.sendUserInfo(this.props.user)
          );
      }
    });
  };

  handleUserInput = (state, val) => {
    this.setState({ [state]: val });
  };

  render() {
    return (
      <div>
        <Background />
        <div className="login-container">
          <form>
            <div className="input-container">
              <h3 className="input-title">Email:</h3>
              <input
                data-cypress-email-input
                required
                autoFocus
                type="email"
                value={this.state.email}
                placeholder="Enter Email"
                className="login-input"
                onChange={e => this.handleUserInput("email", e.target.value)}
              />
            </div>
            <div className="input-container">
              <h3 className="input-title">Password:</h3>
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
          <p className="login-note">
            Note: If you do not already have an account, then this will create
            one for you!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.userReducer, ...state.viewReducer };
};

export default connect(mapStateToProps, {
  userLogin,
  sendUserInfo,
  getUserTrips,
  toggleLogin
})(Login);
