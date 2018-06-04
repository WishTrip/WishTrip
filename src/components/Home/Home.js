import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./Home.css";
import axios from "axios"
import Background from "../Background/Background";
import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";
import { saveAgenda } from "../../ducks/userReducer";
import TimeInput from "material-ui-time-picker";
import Agenda from "../Agenda/Agenda";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 1,
      currentDay: 1,
      newDay: true,
      agenda: 1,
      currentAgenda: 1,
      time: new Date(),
      tripNameInput: "",
      destinationInput: "",
      activityInput: "",
      budgetInput: undefined,
      notesInput: "",
      nextStepsFlag: false,
      latitude: "",
      longitude: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.handleGeocode = this.handleGeocode.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.decrementDay = this.decrementDay.bind(this);
    this.incrementDay = this.incrementDay.bind(this);
  }

  handleHamburgerMenu = () => {
    if (this.props.burgerFlag) {
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
  handleGeocode(geocodeVal, placesVal) {
    const { longitude, latitude } = this.state;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: geocodeVal,
        key: process.env.REACT_APP_GEOCODE_KEY
      }
    })
      .then(response => {
        this.setState({
          latitude: `${response.data.results[0].geometry.location.lat}`,
          longitude: `${response.data.results[0].geometry.location.lng}`
        })
      })
      .catch(function (error) {
        console.log(error)
      })

    axios.get(`/api/userLocation?lat=${latitude}&long=${longitude}&attraction=${placesVal}`).then(res => console.log(res)).catch(console.error)
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
    tripNameInput,
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
        tripNameInput,
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
        tripNameInput,
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
      tripNameInput: "",
      destinationInput: "",
      activityInput: "",
      budgetInput: 0,
      notesInput: ""
    });
  }

  render() {
    const {
      day,
      agenda,
      currentDay,
      currentAgenda,
      time,
      tripNameInput,
      destinationInput,
      activityInput,
      budgetInput,
      notesInput,
      nextStepsFlag,
      latitude,
      longitude
    } = this.state;
    const { days } = this.props;
    let amountOfDays = days.length;

    let currentAgendas = days[currentDay - 1].map((e, i) => {
      return (
        <Agenda key={i} index={i} saved={e} agenda={agenda + i} time={time} />
      );
    });

    return (
      <div onClick={() => this.handleHamburgerMenu()}>
        <div>
          <div
            className="home-wrapper"
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
                className={days[currentDay - 1] ? "fa fa-chevron-right" : null}
              />
            </div>
            <h2 className="home-agenda-text">New Agenda</h2>
            <div className="home-container-wrapper">
              <div className="home-container">
                <input
                  data-cypress-agenda-name
                  className="home-name-input home-inputs"
                  type="text"
                  placeholder="Agenda Name"
                  value={tripNameInput}
                  onChange={e =>
                    this.handleInput("tripNameInput", e.target.value)
                  }
                />
                <div className="home-inputs-container">
                  <div className="home-destination-activity-container">
                    <input
                      data-cypress-agenda-destination
                      className="home-destination-input home-inputs"
                      type="text"
                      placeholder="Agenda Destination"
                      value={destinationInput}
                      onChange={e =>
                        this.handleInput("destinationInput", e.target.value)
                      }
                    />
                    <input
                      data-cypress-agenda-activity
                      className="home-activity-input home-inputs"
                      type="text"
                      placeholder="Agenda Activity"
                      value={activityInput}
                      onChange={e =>
                        this.handleInput("activityInput", e.target.value)
                      }
                    />


                    <button onClick={e => this.handleGeocode(this.state.destinationInput, this.state.activityInput)}>Test</button>


                  </div>
                  <div className="budget-container">
                    <i className="home-dollar-sign">$</i>
                    <input
                      data-cypress-budget
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
                    data-cypress-agenda-notes
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
                      data-cypress-agenda-submit
                      className="home-save-agenda-btn"
                      onClick={() =>
                        this.handleAgenda(
                          tripNameInput,
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
                <button data-cypress-agenda-complete>Complete Trip</button>
                <button
                  data-cypress-agenda-add-day
                  onClick={() => this.handleDay()}
                >
                  Add New Day
                </button>
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

export default connect(mapStateToProps, { toggleHamburgerBtn, saveAgenda })(
  Home
);
