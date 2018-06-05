import React, { Component } from "react";
import "./Trips.css";
// import "font-awesome/css/font-awesome.min.css";
import Background from "../Background/Background";
import Plan from "../Plan/Plan";
import Trip from "../Trip/Trip";
import axios from "axios";
import DatePicker from "material-ui/DatePicker";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";

import { connect } from "react-redux";
import { addInitialTripValues, handleNewDay } from "../../ducks/userReducer";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";

class Trips extends Component {
  constructor() {
    super();
    this.state = {
      tripName: "",
      tripTotalBudget: "",
      tripNotes: "",
      showPlan: false,
      origin: "",
      destination: "",
      starting: "",
      ending: "",
      focus1: false,
      focus2: false,
      day: 0
    };

    this.handleDay = this.handleDay.bind(this);
    this.decrementDay = this.decrementDay.bind(this);
    this.incrementDay = this.incrementDay.bind(this);
  }

  handleInput(key, val) {
    if (key === "tripTotalBudget") {
      return this.setState({
        [key]: parseInt(val, 10)
      });
    }
    this.setState({
      [key]: val
    });
  }

  handleHamburgerMenu = () => {
    if (this.props.burgerFlag) {
      this.props.toggleHamburgerBtn();
    }
  };

  startTrip = () => {
    let {
      day,
      tripName,
      origin,
      destination,
      starting,
      ending,
      tripTotalBudget,
      tripNotes
    } = this.state;
    this.getTripInfo();
    this.handleInput("showPlan", true);
    this.props.addInitialTripValues(
      tripName,
      origin,
      destination,
      starting,
      ending,
      tripTotalBudget,
      tripNotes
    );
    this.setState({
      day: this.state.day + 1
    });
  };

  handleChange = (key, val, prop) => {
    this.setState({ [key]: val, [prop]: true });
  };

  handleSelect = (key, address, prop) => {
    geocodeByAddress(address).then(results =>
      this.setState({ [key]: results[0].formatted_address, [prop]: false })
    );
  };

  getTripInfo = () => {
    axios
      .get(
        `/api/gettravelinfo?origin=${this.state.origin}&destination=${
          this.state.destination
        }&starting=${this.state.starting}&ending=${this.state.ending}`
      )
      .then(res => console.log(res));
  };

  handleDay() {
    let { day } = this.state;
    this.setState(
      {
        day: day + 1
      },
      () => this.props.handleNewDay()
    );
  }

  decrementDay() {
    let { day } = this.state;
    this.setState({
      day: day - 1
    });
  }

  incrementDay() {
    let { day } = this.state;
    this.setState({
      day: day + 1
    });
  }

  render() {
    const {
      tripName,
      tripTotalBudget,
      tripNotes,
      showPlan,
      dots,
      day,
      currentAgenda,
      newDay,
      currentDot
    } = this.state;
    const { user } = this.props;

    let tripDays =
      user.trips &&
      user.trips[0] &&
      user.trips[0].days &&
      user.trips[0].days.map((el, i) => {
        return (
          <Plan
            key={i}
            el={el}
            ind={i}
            day={this.state.day}
            incrementDay={this.incrementDay}
            decrementDay={this.decrementDay}
            handleDay={this.handleDay}
          />
        );
      });
    return (
      <div className="trips-wrapper" onClick={() => this.handleHamburgerMenu()}>
        <Background />
        {!showPlan ? (
          <form className="trips-input-container" onSubmit={this.startTrip}>
            <input
              data-cypress-input-tripname
              required
              className="trips-inputs trips-name-input"
              type="text"
              placeholder="Trip Name"
              value={tripName}
              onChange={e => this.handleInput("tripName", e.target.value)}
            />
            <div className="trips-autocomplete-container">
              <PlacesAutocomplete
                value={this.state.origin}
                onChange={e => this.handleChange("origin", e, "focus1")}
                onSelect={e => this.handleSelect("origin", e, "focus1")}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div>
                    <input
                      data-cypress-departure-location
                      {...getInputProps({
                        required: true,
                        placeholder: "Departure Location",
                        className: "location-search-input"
                      })}
                    />
                    <div
                      style={{
                        zIndex: this.state.focus1 ? 5 : 0,
                        height: this.state.focus1 ? "200px" : 0,
                        width: this.state.focus1 ? "200px" : 0
                      }}
                      className="autocomplete-dropdown-container"
                    >
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <PlacesAutocomplete
                value={this.state.destination}
                onChange={e => this.handleChange("destination", e, "focus2")}
                onSelect={e => this.handleSelect("destination", e, "focus2")}
              >
                {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                  <div>
                    <input
                      data-cypress-starting-location
                      {...getInputProps({
                        required: true,
                        placeholder: "Starting Location",
                        className: "location-search-input"
                      })}
                    />
                    <div
                      style={{
                        zIndex: this.state.focus2 ? 5 : 0,
                        height: this.state.focus2 ? "200px" : 0,
                        width: this.state.focus2 ? "200px" : 0
                      }}
                      className="autocomplete-dropdown-container"
                    >
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
            <div className="trips-date-inputs-container">
              <DatePicker
                data-cypress-startdate
                required={true}
                placeholder="Start Date"
                className="datepicker-size"
                style={{ width: "45%" }}
                onChange={(none, date) => {
                  let month;
                  switch (new Date(date).getMonth()) {
                    case 0:
                      month = "January";
                      break;
                    case 1:
                      month = "February";
                      break;
                    case 2:
                      month = "March";
                      break;
                    case 3:
                      month = "April";
                      break;
                    case 4:
                      month = "May";
                      break;
                    case 5:
                      month = "June";
                      break;
                    case 6:
                      month = "July";
                      break;
                    case 7:
                      month = "August";
                      break;
                    case 8:
                      month = "September";
                      break;
                    case 9:
                      month = "October";
                      break;
                    case 10:
                      month = "November";
                      break;
                    case 11:
                      month = "January";
                      break;
                    default:
                      month = "December";
                  }
                  this.setState({
                    starting: `${month} ${date.getDate()}, ${date.getFullYear()}`
                  });
                }}
                autoOk={true}
              />
              <DatePicker
                data-cypress-enddate
                required={true}
                placeholder="End Date"
                className="datepicker-size"
                style={{ width: "45%" }}
                onChange={(none, date) => {
                  let month;
                  switch (new Date(date).getMonth()) {
                    case 0:
                      month = "January";
                      break;
                    case 1:
                      month = "February";
                      break;
                    case 2:
                      month = "March";
                      break;
                    case 3:
                      month = "April";
                      break;
                    case 4:
                      month = "May";
                      break;
                    case 5:
                      month = "June";
                      break;
                    case 6:
                      month = "July";
                      break;
                    case 7:
                      month = "August";
                      break;
                    case 8:
                      month = "September";
                      break;
                    case 9:
                      month = "October";
                      break;
                    case 10:
                      month = "November";
                      break;
                    case 11:
                      month = "January";
                      break;
                    default:
                      month = "December";
                  }
                  this.setState({
                    ending: `${month} ${date.getDate()}, ${date.getFullYear()}`
                  });
                }}
                autoOk={true}
              />
            </div>
            <input
              data-cypress-budget
              required
              className="trips-inputs"
              type="number"
              placeholder="Trip Budget"
              value={tripTotalBudget}
              onChange={e =>
                this.handleInput("tripTotalBudget", e.target.value)
              }
            />
            <textarea
              data-cypress-notes
              className="trips-inputs trips-notes-input"
              type="text"
              placeholder="import notes, blah, blah, blah.."
              value={tripNotes}
              onChange={e => this.handleInput("tripNotes", e.target.value)}
            />
            <div className="trips-btn-position-container">
              <input
                data-cypress-submit
                type="submit"
                value="Plan Trip"
                className="trips-plan-trip-btn"
              />
            </div>
          </form>
        ) : (
          <div style={{ width: "100%" }}>{tripDays}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.viewReducer,
  ...state.userReducer
});

export default connect(
  mapStateToProps,
  { addInitialTripValues, toggleHamburgerBtn, handleNewDay }
)(Trips);
