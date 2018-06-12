import React from "react";
import "./Trip.css";

export default function Trip(props) {
  const { name, location, budget, notes } = this.props;
  return (
    <div>
      <div className="trips-input-container">
        <h3 className="trips-inputs trips-name-input">{name}</h3>
        <h4 className="trips-inputs">Trip Starting Location: {location}</h4>
        <div className="trips-date-inputs-container">
          <p className="trips-inputs">STARTING DATE</p>
          <p className="trips-inputs">LEAVING DATE</p>
        </div>
        <h4 className="trips-inputs">Trip Total Budget: {budget}</h4>
        <p className="trips-inputs trips-notes-input">{notes}</p>
      </div>
      <div className="trips-btn-position-container">
        <button className="trips-plan-trip-btn">View Trip</button>
        <button className="trips-plan-trip-btn">Delete Trip</button>
      </div>
    </div>
  );
}
