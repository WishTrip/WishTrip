import React, { Component } from "react";
import "./Trips.css";
import Background from "../Background/Background";
import Plan from "../Plan/Plan";
import Trip from "../Trip/Trip";

import { connect } from "react-redux";
import { addInitialTripValues } from "../../ducks/userReducer";

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
      showPlan: false
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

  startTrip() {
    let { tripName, tripStartingLocation, tripTotalBudget, tripNotes } = this.state;
    this.handleInput('showPlan', true);
    this.props.addInitialTripValues(tripName, tripStartingLocation, tripTotalBudget, tripNotes);
  }

  render() {
    const { tripName, tripStartingLocation, tripStartDate, tripEndDate, tripTotalBudget, tripNotes, showPlan } = this.state;
    const { user } = this.props;

        let currentAgendas = user.trips.map((e, i) => {
            return (
                <Trip key={i} index={i} saved={e} name={e.tripName} location={e.tripLocation} budget={e.tripBudget} notes={e.tripNotes} />
            )
        })

    console.log(this.state)
    console.log(this.props)
    return (
      <div className="trips-wrapper">
        <Background />
        {!showPlan ? (
          <div className="trips-input-container" >
            <input className="trips-inputs trips-name-input" type="text" placeholder="Trip Name" value={tripName} onChange={(e) => this.handleInput("tripName", e.target.value)} />
            <input className="trips-inputs" type="text" placeholder="Trip Starting Location" value={tripStartingLocation} onChange={(e) => this.handleInput("tripStartingLocation", e.target.value)} />
            <div className="trips-date-inputs-container">
              <p className="trips-inputs">STARTING DATE</p>
              <p className="trips-inputs">LEAVING DATE</p>
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

export default connect(mapStateToProps, {addInitialTripValues})(Trips);