import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DummyPlan.css";
import Background from "../Background/Background";
import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";
import {
  saveAgenda,
  completeTrip,
  sendUserInfo
} from "../../ducks/userReducer";
import TimeInput from "material-ui-time-picker";
import DummyAgenda from "../DummyAgenda/DummyAgenda";
import _ from "lodash.map";

import { auth } from "../../firebase";
class DummyTripMap extends React.Component {
  state = {
    day: 1,
    currentDay: 0,
    newDay: true,
    agenda: 1,
    currentAgenda: 1,
    time: new Date(),
    agendaNameInput: "",
    destinationInput: "",
    activityInput: "",
    budgetInput: 0,
    notesInput: "",
    nextStepsFlag: false,
    dotHandler: 0,
    editToggle: false
  };

  toggleDot = val => {
    this.setState({ dotHandler: val });
  };
  handleHamburgerMenu = () => {
    if (!this.props.burgerFlag) {
      this.props.toggleHamburgerBtn();
    }
  };

  handleInput = (key, val) => {
    if (key === "budgetInput") {
      return this.setState({
        [key]: parseInt(val, 10)
      });
    }
    this.setState({
      [key]: val
    });
  };

  handleDay = () => {
    let { day, currentDay } = this.state;
    this.setState({
      day: day + 1,
      currentDay: currentDay + 1,
      currentAgenda: 1,
      newDay: true
    });
  };

  decrementDay = () => {
    let { day, currentDay } = this.state;
    this.setState({
      dotHandler: 0,
      day: day - 1,
      currentDay: currentDay - 1
    });
  };

  incrementDay = () => {
    let { day, currentDay } = this.state;

    this.setState({
      dotHandler: 0,
      day: day + 1,
      currentDay: currentDay + 1
    });
  };

  handleAgenda = (
    agendaNameInput,
    destinationInput,
    activityInput,
    budgetInput,
    notesInput,
    time
  ) => {
    let { currentAgenda, newDay, currentDay } = this.state;
    if (newDay) {
      this.props.saveAgenda(
        newDay,
        currentDay,
        currentAgenda,
        agendaNameInput,
        destinationInput,
        activityInput,
        budgetInput,
        notesInput,
        time
      );
      this.setState({
        newDay: false
      });
    } else {
      this.props.saveAgenda(
        newDay,
        currentDay,
        currentAgenda,
        agendaNameInput,
        destinationInput,
        activityInput,
        budgetInput,
        notesInput,
        time
      );
    }

    this.setState({
      nextStepsFlag: true,
      currentAgenda: currentAgenda + 1,
      agendaNameInput: "",
      destinationInput: "",
      activityInput: "",
      budgetInput: 0,
      notesInput: ""
    });
  };

  handleCompleteDay = () => {
    if (auth.currentUser) {
      console.log(auth.currentUser);
      this.props.completeTrip(this.props.days);
      this.props.sendUserInfo(this.props.user);
    } else {
      window.location = "/#/login";
      this.props.completeTrip(this.props.days);
    }
  };


  render() {
    console.log(this.props.currentTrip);
    let {
      day,
      currentDay,
      currentTrip,
      newDay,
      agenda,
      currentAgenda,
      time,
      agendaNameInput,
      destinationInput,
      activityInput,
      budgetInput,
      notesInput,
      nextStepsFlag,
      dotHandler
    } = this.state;
    let mappedTrip = _(this.props.mapthis, (e, i) => {
      return (
        <div
          key={i}
          className={!this.props.currentTrip ? "notCurrentTrip" : "currentTrip"}
        >
          <div>
            <div
              className="home-wrapper"
              onClick={() => this.handleHamburgerMenu()}
            >
              {this.props.trips[this.props.currentTripIndex - 1] && (
                <i
                  onClick={() => {
                    // this.nextTrip();
                    // console.log(`THIS IS STATE = > ${this.state.currentTrip}`);
                    this.props.updateCurrentTrip(
                      this.props.currentTripIndex - 1
                    );
                    // this.setState({ currentTrip: this.state.currentTrip - 1 });
                  }}
                  className={
                    this.props.trips[this.props.currentTripIndex - 1]
                      ? "fa fa-chevron-left"
                      : null
                  }
                />
              )}

              <Background />
              <h2 className="home-agenda-text">{this.props.mapthis.name}</h2>
              {this.props.trips[this.props.currentTripIndex + 1] && (
                <i
                  onClick={() => {
                    this.props.updateCurrentTrip(
                      this.props.currentTripIndex + 1
                    );
                    // this.setState({ currentTrip: this.state.currentTrip + 1 });
                  }}
                  className={
                    this.props.trips[this.props.currentTripIndex + 1]
                      ? "fa fa-chevron-right"
                      : null
                  }
                />
              )}

              <div className="home-day-container home-chevron">
                <i
                  onClick={() => {
                    this.decrementDay();
                  }}
                  className={day === 1 ? null : "fa fa-chevron-left"}
                />
                <h1 className="home-day-text">Day {day}</h1>
                <i
                  onClick={() => {
                    this.incrementDay();
                  }}
                  className={
                    this.props.mapthis.days[currentDay + 1]
                      ? "fa fa-chevron-right"
                      : null
                  }
                // className={
                // thisuser.trips[0].days[this.state.currentDay + 1]
                //     ? "fa fa-chevron-right"
                //     : null
                // }
                />
              </div>

              <div className="home-container-wrapper">
                <i
                  className={
                    this.state.editToggle
                      ? "fa fa-check-square editToggle"
                      : "fa fa-edit editToggle"
                  }
                  onClick={() =>
                    this.setState({ editToggle: !this.state.editToggle })
                  }
                />
                {typeof this.props.mapthis == "object" ? (
                  <DummyAgenda
                    length={
                      this.props.mapthis.days[this.state.currentDay].length + 1
                    }
                    toggleDot={this.toggleDot}
                    dot={this.state.dotHandler}
                    mapThis={this.props.mapthis}
                    currentDay={this.state.currentDay}
                  />
                ) : (
                    <div className="home-container">
                      <input
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
                            className="home-destination-input home-inputs"
                            type="text"
                            placeholder="Agenda Destination"
                            value={destinationInput}
                            onChange={e =>
                              this.handleInput("destinationInput", e.target.value)
                            }
                          />
                          <input
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
                            className="home-clock"
                            mode="12h"
                            okLabel="submit"
                            value={time}
                            onChange={e => this.handleInput("time", e)}
                          />
                          <button
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
                        </div>
                      </div>
                    </div>
                  )}
              </div>
              {nextStepsFlag ? (
                <div>
                  <button
                    onClick={() => {
                      this.handleCompleteDay();
                    }}
                  >
                    Complete Trip
                  </button>
                  <button onClick={() => this.handleDay()}>Add New Day</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    });
    // let Mapz = mappedTrip;
    console.log(mappedTrip[0]);
    return <div>{mappedTrip[0]}</div>;
  }
}
const mapStateToProps = state => ({
  ...state.viewReducer,
  ...state.userReducer
});

export default connect(mapStateToProps, {
  toggleHamburgerBtn,
  saveAgenda,
  completeTrip,
  sendUserInfo
})(DummyTripMap);
