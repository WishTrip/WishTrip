import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import Background from "../Background/Background.js";
import "./Trips.css";

const dummyData = [
  [
    {
      tripName: "Joes 6 fig Mentor Celebration",
      destination: "Orlando",
      start: new Date(),
      end: new Date(),
      budget: "$12,000",
      notes: "this trip is finna be lit",
      tripCode: "1n1kh2p"
    },
    [{ name: "hotel name" }, { name: "hotel2 name" }, { name: "hotel3 name" }],
    [
      { takeoff: "1pm", arrival: "10pm", layover: "2h" },
      { takeoff: "3pm", arrival: "7pm", layover: "0h" },
      { takeoff: "12:30pm", arrival: "5pm", layover: ".5h" }
    ],
    [
      [
        "jump rope",
        "4pm",
        "$440",
        "this is a gymnastic activity fun for our family"
      ],
      [
        "jump rope",
        "2pm",
        "$440",
        "this is a gymnastic activity fun for our family"
      ],
      [
        "jump rope",
        "8am",
        "$440",
        "this is a gymnastic activity fun for our family"
      ]
    ]
  ]
];

class Trips extends Component {
  state = {
    editToggle: false,
    viewTripToggle: false
  };
  render() {
    let mappedTrips = dummyData.map((e, i) => {
      return (
        <div key={i} className="trip-container">
          <div className="trip-main-container">
            <div className="trip-edit-button">
              {this.state.editToggle ? (
                <i
                  className="fa fa-check-square"
                  onClick={() => this.setState({ editToggle: false })}
                />
              ) : (
                <i
                  className="fa fa-edit"
                  onClick={() => this.setState({ editToggle: true })}
                />
              )}
            </div>
            {this.state.editToggle ? (
              <div>
                <div className="trip-main-inner-container">
                  <h6>Trip Name</h6>
                  <input placeholder={e[0].tripName} />
                  <div className="trip-name-duration">
                    <h6>Destination</h6>
                    <input placeholder={e[0].destination} />
                    <h6>Start Day</h6>
                    <input
                      placeholder={
                        e[0].start.getMonth() +
                        " " +
                        e[0].start.getDay() +
                        ", " +
                        e[0].start.getFullYear()
                      }
                    />
                    <h6>End Day</h6>
                    <input
                      placeholder={
                        e[0].end.getMonth() +
                        " " +
                        e[0].end.getDay() +
                        ", " +
                        e[0].end.getFullYear()
                      }
                    />
                  </div>
                  <div className="trip-straight-lines" />
                  <h6>Budget</h6>
                  <input placeholder={e[0].budget} />
                  <div className="trip-description-time-code" />
                  <div className="trip-straight-lines" />
                  <h6>Description</h6>
                  <input placeholder={e[0].notes} />
                  <h6 className="trip-code">Code: {e[0].tripCode}</h6>
                </div>
              </div>
            ) : (
              <div className="trip-main-inner-container">
                <div className="trip-name-top">{e[0].tripName}</div>
                <div className="trip-name-duration">
                  <div className="trip-destination">{e[0].destination}</div>
                  <div className="trip-duration">
                    {e[0].start.getMonth() +
                      " " +
                      e[0].start.getDay() +
                      ", " +
                      e[0].start.getFullYear()}
                  </div>
                  <div className="trip-duration">
                    {e[0].end.getMonth() +
                      " " +
                      e[0].end.getDay() +
                      ", " +
                      e[0].end.getFullYear()}
                  </div>
                </div>
                <div className="trip-straight-lines" />
                <div className="trip-budget">{e[0].budget}</div>
                <div className="trip-description-time-code" />
                <div className="trip-straight-lines" />
                <div className="trip-desciption">{e[0].notes}</div>
                <div className="trip-code">{e[0].tripCode}</div>
                {this.state.viewTripToggle && (
                  <i className="fa fa-arrow-right" />
                )}
              </div>
            )}
          </div>
          <div className="trips-view-delete">
            <div
              className="trips-view"
              onClick={() =>
                this.setState({ viewTripToggle: !this.state.viewTripToggle })
              }
            >
              {this.state.viewTripToggle && !this.state.editToggle ? (
                <h6>Minimize Trip</h6>
              ) : (
                <h6>View Trip</h6>
              )}
            </div>
            <div className="trip-up-line" />
            <div className="trip-delete">Delete Trip</div>
          </div>
        </div>
      );
    });
    return (
      <div>
        <Background />
        <h4>My Trips</h4>
        {mappedTrips}
      </div>
    );
  }
}
export default Trips;
