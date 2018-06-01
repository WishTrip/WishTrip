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
      nextStepsFlag: false,
      dots: [],
      currentDot: 0
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.decrementDay = this.decrementDay.bind(this);
    this.incrementDay = this.incrementDay.bind(this);
    this.handleCompleteDay = this.handleCompleteDay.bind(this);
  }

  componentDidMount() {
    let newDot = [];
    // console.log(this.props.days[this.state.currentDay - 1].length + 1)
    for (
      let i = 0;
      i < this.props.days[this.state.currentDay - 1].length + 1;
      i++
    ) {
      newDot.push(i);
    }
    this.setState({
      dots: newDot
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps.days)
  //   console.log(this.props.days)
  //   if ((prevPr.days !== this.props.days)) {
  //     console.log("COMPONENTDIDUPDATE HITs")
  //     let newDot = []
  //     for (let i = 0; i < this.props.days[this.state.currentDay - 1].length + 1; i++) {
  //       newDot.push(i);
  //     }
  //     this.setState({
  //       dots: newDot
  //     });
  //   }
  // }

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
      currentDay: currentDay - 1,
      currentDot: 0
    });
  }

  incrementDay() {
    let { day, currentDay } = this.state;
    this.setState({
      day: day + 1,
      currentDay: currentDay + 1,
      currentDot: 0
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
    let { currentAgenda, newDay, currentDay, currentDot } = this.state;
    let newDot = this.state.dots.slice();
    newDot.push(currentDot + 1);
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
    console.log(newDot);
    console.log(this.state.dots);
    this.setState({
      dots: newDot,
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
      currentDot,
      time,
      agendaNameInput,
      destinationInput,
      activityInput,
      budgetInput,
      notesInput,
      nextStepsFlag,
      dots
    } = this.state;
    const { days } = this.props;

    console.log(days[currentDay - 1]);
    console.log(currentDot);
    console.log(days[currentDay - 1][currentDot]);

    // let currentAgendas = days[currentDay - 1].map((e, i) => {
    //   return (
    //     <Agenda key={i} index={i} saved={e} agenda={agenda + i} time={time} />
    //   );
    // });

    let newDots = dots.map((dot, j) => {
      return (
        <div>
          <i
            data-cypress-newagenda
            key={j}
            style={{ color: currentDot === j ? "#999" : "#333" }}
            onClick={() => this.setState({ currentDot: j })}
            className="fa fa-circle"
          />
        </div>
      );
    });

    let showingAgenda = (
      <div>
        {days[currentDay - 1].length === currentDot ? (
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
                    className={
                      this.props.days.length === this.state.day
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
                        {this.state.dots.length !== 6 && (
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
                    {this.props.days.length - 1 !== this.state.day ? null : (
                      <button onClick={this.handleDay}>New Day</button>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div className="home-wrapper">
            <h2 className="home-agenda-text">Agenda {agenda}</h2>
            <div className="home-container-wrapper agenda-container-wrapper">
              <div className="home-container">
                <div className="new-dots-container">{newDots}</div>
                <p className="home-name-input home-inputs">
                  {days[currentDay - 1][currentDot].name}
                </p>
                <div className="home-inputs-container">
                  <div className="home-destination-activity-container">
                    <p className="home-destination-input home-inputs">
                      {days[currentDay - 1][currentDot].destination}
                    </p>
                    <p className="home-activity-input home-inputs">
                      {days[currentDay - 1][currentDot].activity}
                    </p>
                  </div>
                  <p className="home-budget-input home-inputs">
                    {days[currentDay - 1][currentDot].budget}
                  </p>
                  <p className="home-notes-input  home-inputs">
                    {days[currentDay - 1][currentDot].notes}
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
          </div>
        )}
      </div>
    );

    return <div>{showingAgenda}</div>;
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
