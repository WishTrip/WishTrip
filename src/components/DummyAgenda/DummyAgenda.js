import React, { Component } from "react";
import "./DummyAgenda.css";
import "font-awesome/css/font-awesome.min.css";
import TimeInput from "material-ui-time-picker";
import _ from "lodash.map";

export default class DummyAgenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: []
      // activeDot: this.props.dot && 0
    };
  }

  componentDidMount() {
    console.log(`STATE : => ${this.state.dots.length}`);
    let newDot = [];
    for (let i = 0; i < this.props.length; i++) {
      newDot.push(i);
    }
    this.setState({
      dots: newDot
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.length !== this.props.length) {
      let newDot = [];
      for (let i = 0; i < this.props.length; i++) {
        newDot.push(i);
      }
      this.setState({
        dots: newDot
      });
    }
  }

  render() {
    // console.log(this.props.mapThis.days[this.props.currentDay][this.props.dot]);
    // console.log(this.props.dotHandler);
    console.log(this.props.dot)
    console.log(this.props.length)
    let newDots = this.state.dots.map((dot, i) => {

      return (
        <i
          key={i}
          style={{ color: dot === this.props.dot ? "#999" : "#333" }}
          onClick={() => {
            this.props.toggleDot(dot);
            // this.setState({ activeDot: dot });
          }}
          className="fa fa-circle"
        />
      );
    });
    let agendasMap = (
      // _(
      //   this.props.mapThis.days[this.props.currentDay][this.props.dot],
      //   (e, i) => {
      //     return (
      <div className="home-container-wrapper agenda-container-wrapper">
        {this.props.length === this.props.dot + 1 ? (
          <div>
            <input placeholder="bet" type="text" />
            <button>Add Agenda</button>
          </div>
        ) : (
            <div>
              <p>{this.props.mapThis.days[this.props.currentDay][this.props.dot].name}</p>
              <p>{this.props.mapThis.days[this.props.currentDay][this.props.dot].budget}</p>
              <p>{this.props.mapThis.days[this.props.currentDay][this.props.dot].notes}</p>
            </div>
          )}

        {/* <div className="home-container"> */}
        {/* <p className="home-name-input home-inputs">{e.name}</p> */}
        {/* <div className="home-inputs-container"> */}
        {/* <div className="home-destination-activity-container"> */}
        {/* <p className="home-destination-input home-inputs">
                  {e[this.props.dot].destination}
                </p> */}
        {/* <p className="home-activity-input home-inputs">
                  {e[this.props.dot].activity}
                </p> */}
        {/* </div> */}
        {/* <p className="home-budget-input home-inputs">{e.budget}</p>
                <p className="home-notes-input  home-inputs">{e.notes}</p> */}
        {/* <div className="home-time-agenda-container">
                  <TimeInput
                    style={{ color: "#fff" }}
                    className="home-clock"
                    disabled
                    mode="12h"
                    okLabel="submit"
                    value={time}
                    onChange={e => this.handleInput("time", e)}
                  />
                </div> */}
        {/* </div> */}
        {/* </div> */}
      </div>
    );
    {
      /* );
      }
    ); */
    }
    return (
      <div className="agenda-wrapper">
        <div className="dot-agendas">{newDots}</div>
        {agendasMap}
      </div>
    );
  }
}
