import React, { Component } from "react";
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

import { auth } from "../../firebase";
// user.trips[0].days[0]

const user = {
  trips: [
    [
      {
        name: "Orlando Family Trip",
        startDate: new Date(),
        endDate: new Date(),
        startLocation: "Dallas, TX",
        endLocation: "Nashville, TN",
        cost: "$10,000",
        days: [
          [
            {
              name: "jarids birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "jarids birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "jarids birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            }
          ],
          [
            {
              name: "joes birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "joes birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "joes birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            }
          ],
          [
            {
              name: "jacobs birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "jacobs birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "jacobs birthday",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            }
          ],
          [
            {
              name: "joes move in day",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "joes move in day",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            },
            {
              name: "joes move in day",
              budget: "$200",
              notes: "ice cream, lots of ice cream"
            }
          ]
        ],
        hotels: [
          "placeholderURL.com",
          { name: "hotel1", price: "$2,500", image: "image" },
          { name: "hotel2", price: "$2,500", image: "image" },
          { name: "hotel3", price: "$2,500", image: "image" },
          { name: "hotel4", price: "$2,500", image: "image" },
          { name: "hotel5", price: "$2,500", image: "image" },
          { name: "hotel6", price: "$2,500", image: "image" }
        ]
      }
    ]
  ]
};

class DummyPlan extends Component {
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
      nextStepsFlag: false,
      dotHandler: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.decrementDay = this.decrementDay.bind(this);
    this.incrementDay = this.incrementDay.bind(this);
    this.handleCompleteDay = this.handleCompleteDay.bind(this);
  }
  toggleDot = val => {
    console.log(val);
    this.setState({ dotHandler: val });
  };
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
    if (auth.currentUser) {
      console.log(auth.currentUser);
      this.props.completeTrip(this.props.days);
      this.props.sendUserInfo(this.props.user);
    } else {
      window.location = "/#/login";
      this.props.completeTrip(this.props.days);
    }
  }

  render() {
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
    // [0].days[0]
    // let currentAgendas = user.trips.map((e, i) => {
    //   return <DummyAgenda key={i} length={3} />;
    // });
    console.log(this.props);
    return (
      <div>
        <div>
          <div
            className="home-wrapper"
            onClick={() => this.handleHamburgerMenu()}
          >
            <Background />
            <h2 className="home-agenda-text">Trip Name</h2>
            <div className="home-day-container home-chevron">
              <i
                onClick={() => this.decrementDay()}
                className={day === 1 ? null : "fa fa-chevron-left"}
              />
              <h1 className="home-day-text">Day {day}</h1>
              <i
                onClick={() => this.incrementDay()}
                className={days[currentDay - 1] ? "fa fa-chevron-right" : null}
              />
            </div>

            <div className="home-container-wrapper">
              {!this.props.user.trips.length ? (
                <DummyAgenda
                  length={6}
                  toggleDot={this.toggleDot}
                  dot={this.state.dotHandler}
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
})(DummyPlan);
