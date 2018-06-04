import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./Plan.css";
import Background from "../Background/Background";
import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";
import {
  saveAgenda,
  completeTrip,
  sendUserInfo
} from "../../ducks/userReducer";
import TimeInput from "material-ui-time-picker";

import { auth } from "../../firebase";

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAgenda: 1,
      time: new Date(),
      agendaNameInput: "",
      destinationInput: "",
      activityInput: "",
      dots: [0],
      budgetInput: 0,
      notesInput: "",
      currentDot: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.handleCompleteDay = this.handleCompleteDay.bind(this);
  }

  handleHamburgerMenu = () => {
    if (!this.props.burgerFlag) {
      this.props.toggleHamburgerBtn();
    }
  };

  handleInput(key, val) {
    if (key === "budgetInput") {
      return this.setState({
        [key]: parseInt(val, 10)
      });
    }
    this.setState({
      [key]: val
    });
  }

  handleAgenda(
    agendaNameInput,
    destinationInput,
    activityInput,
    budgetInput,
    notesInput,
    time
  ) {
    let { currentAgenda, currentDot } = this.state;
    let { day } = this.props;
    let newDot = this.state.dots.slice();
    if (currentDot < 5) {
      newDot.push(currentDot + 1);
    }
    this.setState({
      currentAgenda: currentAgenda + 1,
      currentDot: currentDot === 5 ? 5 : currentDot + 1,
      agendaNameInput: "",
      destinationInput: "",
      activityInput: "",
      budgetInput: 0,
      notesInput: "",
      dots: newDot
    });
    this.props.saveAgenda(
      day,
      currentAgenda,
      agendaNameInput,
      destinationInput,
      activityInput,
      budgetInput,
      notesInput,
      time
    );
  }

  handleCompleteDay() {
    if (this.props.user.userinfo.uid) {
      this.props.completeTrip(this.props.days);
      this.props.sendUserInfo(this.props.user);
      window.location = "/#/profile";
    } else {
      window.location = "/#/login";
      this.props.completeTrip(this.props.days);
    }
  }

  render() {
    const { days, day, handleDay, incrementDay, decrementDay } = this.props;
    const {
      currentAgenda,
      currentDot,
      time,
      agendaNameInput,
      destinationInput,
      activityInput,
      budgetInput,
      notesInput,
      dots
    } = this.state;

    let newDots = dots.map((dot, j) => {
      return (
        <div key={j}>
          <i
            data-cypress-newagenda
            style={{ color: currentDot === j ? "#999" : "#333" }}
            onClick={() => this.setState({ currentDot: j })}
            className="fa fa-circle"
          />
        </div>
      );
    });

    let showingAgenda = (
      <div>
        {days[day - 1] &&
        days[day - 1].length === currentDot &&
        currentDot < 6 ? (
          <div className="plan-wrapper">
            <div>
              <div className="home-wrapper" onClick={this.handleHamburgerMenu}>
                <Background />
                <div className="home-day-container home-chevron">
                  <i
                    onClick={decrementDay}
                    className={day === 1 ? null : "fa fa-chevron-left"}
                  />
                  <h1 className="home-day-text">Day {day}</h1>
                  <i
                    onClick={incrementDay}
                    className={
                      days.length === day ? null : "fa fa-chevron-right"
                    }
                    onClick={incrementDay}
                    className={
                      this.props.days.length === day
                        ? null
                        : "fa fa-chevron-right"
                    }
                  />
                </div>
                <h2 className="home-agenda-text">New Agenda</h2>
                <div className="home-container-wrapper">
                  <div className="home-container">
                    <div className="new-dots-container">{newDots}</div>
                    <input
                      data-cypress-agendaname
                      className="home-name-input home-inputs"
                      type="text"
                      placeholder="Agenda Name"
                      value={agendaNameInput}
                      onChange={e =>
                        this.handleInput("agendaNameInput", e.target.value)
                      }
                    />
                    <div className="home-inputs-container">
                      <div className="home-destination-activity-container">
                        <input
                          data-cypress-agendadestination
                          className="home-destination-input home-inputs"
                          type="text"
                          placeholder="Agenda Destination"
                          value={destinationInput}
                          onChange={e =>
                            this.handleInput("destinationInput", e.target.value)
                          }
                        />
                        <input
                          data-cypress-agendaactivity
                          className="home-activity-input home-inputs"
                          type="text"
                          placeholder="Agenda Activity"
                          value={activityInput}
                          onChange={e =>
                            this.handleInput("activityInput", e.target.value)
                          }
                        />
                      </div>
                      <div className="budget-container">
                        <i className="home-dollar-sign">$</i>
                        <input
                          data-cypress-agendabudget
                          className="home-budget-input-position  home-budget-input home-inputs"
                          type="number"
                          placeholder="Budget for Day"
                          value={budgetInput}
                          onChange={e =>
                            this.handleInput("budgetInput", e.target.value)
                          }
                        />
                      </div>
                      <textarea
                        data-cypress-agendanotes
                        className="home-notes-input  home-inputs"
                        type="text"
                        placeholder="import notes, blah, blah, blah.."
                        value={notesInput}
                        onChange={e =>
                          this.handleInput("notesInput", e.target.value)
                        }
                      />
                      <div className="home-time-agenda-container">
                        <TimeInput
                          data-cypress-timeinput
                          className="home-clock"
                          mode="12h"
                          okLabel="submit"
                          value={time}
                          onChange={e => this.handleInput("time", e)}
                        />
                        {dots.length !== 7 && (
                          <button
                            data-cypress-addagenda
                            className="home-save-agenda-btn"
                            onClick={() =>
                              this.handleAgenda(
                                agendaNameInput,
                                destinationInput,
                                activityInput,
                                budgetInput,
                                notesInput,
                                time
                              )
                            }
                          >
                            Add Agenda
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-container">
                  <button
                    className="home-save-agenda-btn"
                    onClick={this.handleCompleteDay}
                  >
                    Complete Trip
                  </button>
                  <button
                    className="home-save-agenda-btn"
                    onClick={this.props.handleDay}
                  >
                    New Day
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="home-wrapper">
            <div className="home-day-container home-chevron">
              <i
                onClick={decrementDay}
                className={day === 1 ? null : "fa fa-chevron-left"}
              />
              <h1 className="home-day-text">Day {day}</h1>
              <i
                onClick={incrementDay}
                className={days.length === day ? null : "fa fa-chevron-right"}
              />
            </div>
            <h2 className="home-agenda-text">
              Agenda {currentDot === 6 ? "6" : currentDot + 1}
            </h2>
            <div className="home-container-wrapper">
              <div className="home-container">
                <div className="new-dots-container">{newDots}</div>
                <p className="home-name-input home-inputs">
                  {days[day - 1] &&
                    days[day - 1][currentDot] &&
                    days[day - 1][currentDot].name}
                </p>
                <div className="home-inputs-container">
                  <div className="home-destination-activity-container">
                    <p className="home-destination-input home-inputs">
                      {days[day - 1] &&
                        days[day - 1][currentDot] &&
                        days[day - 1][currentDot].destination}
                    </p>
                    <p className="home-activity-input home-inputs">
                      {days[day - 1] &&
                        days[day - 1][currentDot] &&
                        days[day - 1][currentDot].activity}
                    </p>
                  </div>
                  <p className="home-budget-input home-inputs">
                    {days[day - 1] &&
                      days[day - 1][currentDot] &&
                      days[day - 1][currentDot].budget}
                  </p>
                  <p className="home-notes-input  home-inputs">
                    {days[day - 1] &&
                      days[day - 1][currentDot] &&
                      days[day - 1][currentDot].notes}
                  </p>
                  <div className="home-time-agenda-container">
                    <TimeInput
                      style={{ color: "#fff" }}
                      className="home-clock"
                      disabled
                      mode="12h"
                      okLabel="submit"
                      value={time}
                      onChange={e => this.handleInput("time", e)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="btn-container">
              <button
                className="home-save-agenda-btn"
                onClick={this.handleCompleteDay}
              >
                Complete Trip
              </button>
              <button
                className="home-save-agenda-btn"
                onClick={this.props.handleDay}
              >
                New Day
              </button>
            </div>
          </div>
        )}
      </div>
    );

    return (
      this.props.day - 1 === this.props.ind && (
        <div style={{ width: "100%" }}>{showingAgenda}</div>
      )
    );
  }
}

const mapStateToProps = state => ({
  ...state.viewReducer,
  ...state.userReducer
});

export default connect(
  mapStateToProps,
  {
    toggleHamburgerBtn,
    saveAgenda,
    completeTrip,
    sendUserInfo
  }
)(Plan);
