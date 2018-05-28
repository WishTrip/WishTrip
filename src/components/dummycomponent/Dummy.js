import React, { Component } from "react";
import axios from "axios";
import DatePicker from "material-ui/DatePicker";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import PlacesAutocomplete from "react-places-autocomplete/dist/PlacesAutocomplete";

class Dummy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: "",
      destination: "",
      starting: "",
      ending: ""
    };
  }

  handleChange = (key, val) => {
    this.setState({ [key]: val });
  };
  handleSelect = (key, address) => {
    geocodeByAddress(address).then(results =>
      this.setState({ [key]: results[0].formatted_address })
    );
    // getLatLng(results[0]))
    // .then(latLng => console.log("success", latLng))
    // .catch(error => console.error("error", error));
  };

  getTripInfo = () => {
    // let startingWeek = new Date(this.state.starting).getMonthWeek();
    // let endingWeek = new Date(this.state.ending).getMonthWeek();
    axios
      .get(
        `/api/gettravelinfo?origin=${this.state.origin}&destination=${
          this.state.destination
        }&starting=${this.state.starting}&ending=${this.state.ending}`
      )
      .then(res => console.log(res));
  };
  render() {
    console.log(this.state.destination);
    return (
      <div>
        <DatePicker
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

        <PlacesAutocomplete
          value={this.state.origin}
          onChange={e => this.handleChange("origin", e)}
          onSelect={e => this.handleSelect("origin", e)}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
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
                  placeholder: "Search Places ...",
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

        <button onClick={this.getTripInfo}>search for me</button>
      </div>
    );
  }
}
export default Dummy;
