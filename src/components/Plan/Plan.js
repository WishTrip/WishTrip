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
import Agenda from "../Agenda/Agenda";

import { auth } from "../../firebase";

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 1,
      currentDay: 1,
      newDay: true,
      agenda: 1,
      currentAgenda: 1,
      time: new Date(),
      agendaNameInput: "",
      destinationInput: "",
      activityInput: "",
      budgetInput: 0,
      notesInput: "",
      nextStepsFlag: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.decrementDay = this.decrementDay.bind(this);
    this.incrementDay = this.incrementDay.bind(this);
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

  handleDay() {
    let { day, currentDay } = this.state;
    this.setState({
      day: day + 1,
      currentDay: currentDay + 1,
      currentAgenda: 1,
      newDay: true
    });
  }

  decrementDay() {
    let { day, currentDay } = this.state;
    this.setState({
      day: day - 1,
      currentDay: currentDay - 1
    });
  }

  incrementDay() {
    let { day, currentDay } = this.state;
    this.setState({
      day: day + 1,
      currentDay: currentDay + 1
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
  }

  handleCompleteDay() {
    // if (auth.currentUser) {
    if (this.props.user.userinfo.uid) {
      console.log(this.props.userinfo);
      this.props.completeTrip(this.props.days);
      this.props.sendUserInfo(this.props.user);
    } else {
      window.location = "/#/login";
      this.props.completeTrip(this.props.days);
    }
  }

  render() {
    // console.log(this.props.days.length)
    console.log(this.state.currentDay - 1)
    console.log(this.props.days)
    // {(this.props.days.length > 1 && (this.props.days.length === this.state.day)) ? null : <button onClick={this.handleDay}>New Day</button> }
    console.log(this.props.days[this.state.currentDay - 1].length)
    // console.log(this.state.currentDay)
    // console.log(this.state.currentAgenda)

    const {
      day,
      agenda,
      currentDay,
      currentAgenda,
      time,
      agendaNameInput,
      destinationInput,
      activityInput,
      budgetInput,
      notesInput,
      nextStepsFlag
    } = this.state;
    const { days } = this.props;
    let amountOfDays = days.length;

    let currentAgendas = days[currentDay - 1].map((e, i) => {
      return (
        <Agenda key={i} index={i} saved={e} agenda={agenda + i} time={time} />
      );
    });

    return (
      <div className="plan-wrapper">
        <div>
          <div
            className="home-wrapper"
            onClick={() => this.handleHamburgerMenu()}
          >
            <Background />
            <div className="home-day-container home-chevron">
              <i
                onClick={() => this.decrementDay()}
                className={day === 1 ? null : "fa fa-chevron-left"}
              />
              <h1 className="home-day-text">Day {day}</h1>
              <i
                onClick={() => this.incrementDay()}
                className={this.props.days.length === this.state.day ? null : "fa fa-chevron-right"}
              />
            </div>
            <h2 className="home-agenda-text">New Agenda</h2>
            <div className="home-container-wrapper">
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
                {console.log(this.props.days.length)}
                {console.log(this.state.day)}
                {this.props.days.length - 1 !== this.state.day ? null : <button onClick={this.handleDay}>New Day</button> }
                
                </div>
              ) : null}
              </div>
              </div>
              {currentAgendas}
              </div>
            );
          }
        }
        
        const mapStateToProps = state => ({
          ...state.viewReducer,
          ...state.userReducer
        });
        // {(this.props.days.length > 1 && (this.props.days.length === this.state.day)) ? null : <button onClick={this.handleDay}>New Day</button> }
        // {(this.props.days[this.state.currentDay - 1].length === 0 || this.props.days.length - 1 < this.props.days[currentDay - 1]) ? null : <button onClick={() => this.handleDay()}>Add New Day</button>}
export default connect(mapStateToProps, {
  toggleHamburgerBtn,
  saveAgenda,
  completeTrip,
  sendUserInfo
})(Plan);
