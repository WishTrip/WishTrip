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
import { addInitialTripValues } from "../../ducks/userReducer";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";

class Trips extends Component {
  constructor() {
    super();
    this.state = {
      tripName: "",
      tripStartingLocation: "",
      tripStartDate: "",
      tripEndDate: "",
      tripTotalBudget: 0,
      tripNotes: "",
      showPlan: false,
      origin: "",
      destination: "",
      starting: "",
      ending: ""
    }
  }


  handleInput(key, val) {
    if (key === 'tripTotalBudget') {
      return this.setState({
        [key]: parseInt(val, 10)
      })
    }
    this.setState({
      [key]: val
    })
  }

  handleHamburgerMenu = () => {
    if (this.props.burgerFlag) {
      this.props.toggleHamburgerBtn();
    }
  };

  startTrip() {
    let { tripName, tripStartingLocation, tripTotalBudget, tripNotes } = this.state;
    this.getTripInfo();
    this.handleInput('showPlan', true);
    this.props.addInitialTripValues(tripName, tripStartingLocation, tripTotalBudget, tripNotes);
  }

  handleChange = (key, val) => {
    this.setState({ [key]: val });
  };
  handleSelect = (key, address) => {
    geocodeByAddress(address).then(results =>
      this.setState({ [key]: results[0].formatted_address })
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

  render() {
    const { tripName, tripStartingLocation, tripStartDate, tripEndDate, tripTotalBudget, tripNotes, showPlan } = this.state;
    const { user } = this.props;

        let currentAgendas = user.trips.map((e, i) => {
            return (
                <Trip key={i} index={i} saved={e} name={e.tripName} location={e.tripLocation} budget={e.tripBudget} notes={e.tripNotes} />
            )
        })

    // <input className="trips-inputs" type="text" placeholder="Trip Starting Location" value={tripStartingLocation} onChange={(e) => this.handleInput("tripStartingLocation", e.target.value)} />
    return (
      <div className="trips-wrapper" onClick={() => this.handleHamburgerMenu()}>
        <Background />
        {!showPlan ? (
          <div className="trips-input-container" >
            <input className="trips-inputs trips-name-input" type="text" placeholder="Trip Name" value={tripName} onChange={(e) => this.handleInput("tripName", e.target.value)} />
            <div className="trips-autocomplete-container">
              <PlacesAutocomplete
                value={this.state.origin}
                onChange={e => this.handleChange("origin", e)}
                onSelect={e => this.handleSelect("origin", e)}
              >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Departure Location",
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
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
            onChange={e => this.handleChange("destination", e)}
            onSelect={e => this.handleSelect("destination", e)}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Starting Location",
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
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
            placeholder="Start Date"
            // dialogContainerStyle={{backgroundColor: "#fff", color: "white"}}
            // underlineStyle={{ borderBottom: "white" }}
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
          placeholder="End Date"
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
            <input className="trips-inputs" type="number" placeholder="Trip Budget" value={tripTotalBudget} onChange={(e) => this.handleInput("tripTotalBudget", e.target.value)} />
            <textarea className="trips-inputs trips-notes-input" type="text" placeholder="import notes, blah, blah, blah.." value={tripNotes} onChange={(e) => this.handleInput("tripNotes", e.target.value)} />
            <div className="trips-btn-position-container">
              <button className="trips-plan-trip-btn" onClick={() => this.startTrip()}>Plan Trip</button>
            </div>
          </div>
        ) : (
          <Plan />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.viewReducer,
  ...state.userReducer
});

export default connect(mapStateToProps, { addInitialTripValues, toggleHamburgerBtn })(Trips);