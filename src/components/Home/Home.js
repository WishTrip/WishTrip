import React, { Component } from "react";
import "./Home.css";
import Background from "../Background/Background";

import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";
//firebase auth
import { auth } from "../../firebase";

class Home extends Component {
  state = {
    currentUser: {}
  };
  handleHamburgerMenu = () => {
    if (!this.props.burgerFlag) {
      this.props.toggleHamburgerBtn();
    }
  };
  componentDidMount() {
    var user = auth.currentUser;

    if (user) {
      this.setState({ currentUser: user });
      console.log(user);
    }
  }
  render() {
    return (
      <div onClick={() => this.handleHamburgerMenu()}>
        <Background />

        {this.state.currentUser && this.state.currentUser.email ? (
          <h2>Welcome {this.state.currentUser.email}</h2>
        ) : (
          <h1> YOU ARE NOT LOGGED IN</h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.viewReducer
});

export default connect(mapStateToProps, { toggleHamburgerBtn })(Home);
