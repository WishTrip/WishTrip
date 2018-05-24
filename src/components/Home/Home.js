import React, { Component } from "react";
import "./Home.css";
import Background from "../Background/Background";

import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";

class Home extends Component {
  state = {
    day: 1
  };

  handleHamburgerMenu = () => {
    if (!this.props.burgerFlag) {
      this.props.toggleHamburgerBtn();
    }
  };

  render() {
    const { day } = this.state;
    return (
      <div className="home-wrapper" onClick={() => this.handleHamburgerMenu()}>
        <Background />
        <h2 className="home-day-text">Day {day}</h2>
        <div className="home-container-wrapper">
          <div className="home-container">
            <input
              className="home-name-input home-inputs"
              type="text"
              placeholder="Trip Name"
            />
            <div className="home-inputs-container">
              <input
                className="home-destination-input home-inputs"
                type="text"
                placeholder="Trip Destination"
              />
              <input
                className="home-budget-input home-inputs"
                type="text"
                placeholder="Budget for Day"
              />
              <textarea
                className="home-notes-input  home-inputs"
                type="text"
                placeholder="import notes, blah, blah, blah.."
              />
              <div className="home-time-agenda-container">
                <h3 className="home-day-time">Time: 10:00am</h3>
                <button className="home-save-agenda-btn">Save Agenda</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.viewReducer
});

export default connect(mapStateToProps, { toggleHamburgerBtn })(Home);
