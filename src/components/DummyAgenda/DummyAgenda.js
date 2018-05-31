import React, { Component } from "react";
import "./DummyAgenda.css";
import "font-awesome/css/font-awesome.min.css";
import TimeInput from "material-ui-time-picker";
import Jin from "./Jin";

export default class DummyAgenda extends Component {
  constructor() {
    super();
    this.state = {
      dots: [],
      activeDot: 0
    };
  }

  componentDidMount() {
    let newDot = [];
    for (let i = 0; i < this.props.length; i++) {
      newDot.push(i);
    }
    this.setState({
      dots: newDot
    });
  }

  render() {
    let newDots = this.state.dots.map(dot => {
      return (
        <i
          style={{ color: dot === this.state.activeDot ? "blue" : "grey" }}
          onClick={() => {
            this.setState({ activeDot: dot });
          }}
          className="fa fa-circle"
        />
      );
    });

    let activeComponent = this.state.dots.map(active => {
      return (
        <Jin key={active} active={active} activeDot={this.state.activeDot} />
      );
    });
    return (
      <div className="agenda-wrapper">
        {activeComponent}
        <div className="dot-agendas">{newDots}</div>
        <p>hello world</p>
        {/* {mappedDots} */}
        {/* <h2 className="home-agenda-text">Agenda {agenda}</h2> */}
        {/* <div className="home-container-wrapper agenda-container-wrapper">
        <div className="home-container">
          <p className="home-name-input home-inputs">{saved.name}</p>
          <div className="home-inputs-container">
            <div className="home-destination-activity-container">
              <p className="home-destination-input home-inputs">
                {saved.destination}
              </p>
              <p className="home-activity-input home-inputs">
                {saved.activity}{" "}
              </p>
            </div>
            <p className="home-budget-input home-inputs">${saved.budget}</p>
            <p className="home-notes-input  home-inputs">{saved.notes}</p>
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
      </div> */}
      </div>
    );
  }
}
