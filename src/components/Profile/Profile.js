import React, { Component } from "react";
import "./Profile.css";
import forEach from "lodash.foreach";

import { connect } from "react-redux";
import { userLogin } from "../../ducks/userReducer";
import Background from "../Background/Background";
import { auth } from "../../firebase";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      userID: auth.currentUser ? auth.currentUser.uid : "",
      trip: 0,
      day: 0,
      currentDot: 0,
      dots: [0],
      viewTrip: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.decrementTrip = this.decrementTrip.bind(this);
    this.incrementTrip = this.incrementTrip.bind(this);
    this.decrementDay = this.decrementDay.bind(this);
    this.incrementDay = this.incrementDay.bind(this);
    this.showTrip = this.showTrip.bind(this);
    this.hideTrip = this.hideTrip.bind(this);
    this.getDots = this.getDots.bind(this);
  }

  componentDidMount() {
    if (auth.currentUser === null) {
      window.location = "/#/login";
    }
    this.getDots();
  }

  getDots() {
    let { trip, day, currentDot } = this.state;
    let newDot = [];
    if (this.props.currentUserTrips[trip]) {
      for (
        let i = 0;
        i < this.props.currentUserTrips[trip].days[day].length;
        i++
      ) {
        newDot.push(i);
      }
      this.setState({
        dots: newDot
      });
    }
  }

  handleUserInput = (state, e) => {
    this.setState({ [state]: e.target.value });
  };

  showTrip() {
    let { viewTrip } = this.state;
    this.getDots();
    this.setState({
      viewTrip: !viewTrip
    });
  }

  hideTrip() {
    let { viewTrip } = this.state;
    this.setState({
      day: 0,
      currentDot: 0,
      dots: [0],
      viewTrip: false
    });
  }

  decrementTrip() {
    let { trip } = this.state;
    this.setState({
      trip: trip - 1
      // viewTrip: false
    });
  }

  incrementTrip() {
    let { trip } = this.state;
    this.setState({
      trip: trip + 1
      // viewTrip: false
    });
  }

  decrementDay() {
    let { day } = this.state;
    this.setState(
      {
        day: day - 1,
        currentDot: 0
      },
      () => this.getDots()
    );
  }

  incrementDay() {
    let { day } = this.state;
    this.setState(
      {
        day: day + 1,
        currentDot: 0
      },
      () => this.getDots()
    );
  }

  render() {
    if (auth.currentUser === null) {
      window.location = "/#/login";
    }

    const {
      username,
      email,
      userID,
      trip,
      day,
      currentDot,
      dots,
      viewTrip
    } = this.state;
    const { currentUserTrips } = this.props;
    let newDots = dots.map((dot, j) => {
      return (
        <div key={j}>
          <i
            data-cypress-newagenda
            style={{ color: currentDot === j ? "#999" : "#333" }}
            onClick={() => this.setState({ currentDot: j })}
            className="fa fa-circle"
          />
        </div>
      );
    });

    let userTrips;
    currentUserTrips.map((e, i, a) => {
      if (userTrips === undefined) {
        userTrips = (
          <div className="trips-wrapper">
            <div className="home-day-container home-chevron">
              <i
                style={{ marginBottom: "15px" }}
                onClick={this.decrementTrip}
                className={trip === 0 ? null : "fa fa-chevron-left"}
              />
              <h1 className="home-day-text">{a[trip].name}</h1>
              <i
                style={{ marginBottom: "15px" }}
                onClick={this.incrementTrip}
                className={
                  currentUserTrips.length === trip + 1
                    ? null
                    : "fa fa-chevron-right"
                }
              />
            </div>
            <div className="profile-input-container">
              <div>
                <h3 className="trip-info-title">Current Location:</h3>
                <h3 className="trip-info">{a[trip].origin}</h3>
              </div>
              <div>
                <h3 className="trip-info-title">Destination:</h3>
                <h3 className="trip-info">{a[trip].destination}</h3>
              </div>
              <div>
                <h3 className="trip-info-title">Start Date:</h3>
                <h3 className="trip-info">{a[trip].starting}</h3>
              </div>
              <div>
                <h3 className="trip-info-title">End Date:</h3>
                <h3 className="trip-info">{a[trip].ending}</h3>
              </div>
              <div>
                <h3 className="trip-info-title">Trip Budget:</h3>
                <h3 className="trip-info">{a[trip].budget}</h3>
              </div>
              <div>
                <p className="trip-info-title">Trip Notes:</p>
                <p
                  style={{ fontSize: "18px", fontWeight: "400" }}
                  className="trip-info"
                >
                  {a[trip].notes}
                </p>
              </div>
            </div>
            <button className="home-save-agenda-btn" onClick={this.showTrip}>
              View Trip
            </button>
          </div>
        );
      }
    });

    let userTripsDays;
    if (
      currentUserTrips &&
      currentUserTrips[trip] &&
      currentUserTrips[trip].days[day]
    ) {
      currentUserTrips.map((e, i, a) => {
        if (userTripsDays === undefined)
          userTripsDays = (
            <div className="trips-wrapper">
              <div className="home-day-container home-chevron">
                <i
                  style={{ marginBottom: "15px" }}
                  onClick={this.decrementDay}
                  className={day === 0 ? null : "fa fa-chevron-left"}
                />
                <h1 className="home-day-text">Day {day + 1}</h1>
                <i
                  style={{ marginBottom: "15px" }}
                  onClick={this.incrementDay}
                  className={
                    a[trip].days.length === day + 1
                      ? null
                      : "fa fa-chevron-right"
                  }
                />
              </div>
              <h2 className="home-agenda-text">
                Agenda {currentDot === 6 ? "6" : currentDot + 1}
              </h2>
              <div className="home-container-wrapper">
                <div className="home-container">
                  <div className="new-dots-container">{newDots}</div>
                  <p className="home-name-input home-inputs">
                    {a[trip].days[day] &&
                      a[trip].days[day][currentDot] &&
                      a[trip].days[day][currentDot].name}
                  </p>
                  <div className="home-inputs-container">
                    <div className="home-destination-activity-container">
                      <p className="home-destination-input home-inputs">
                        {a[trip].days[day] &&
                          a[trip].days[day][currentDot] &&
                          a[trip].days[day][currentDot].destination}
                      </p>
                      <p className="home-activity-input home-inputs">
                        {a[trip].days[day] &&
                          a[trip].days[day][currentDot] &&
                          a[trip].days[day][currentDot].activity}
                      </p>
                    </div>
                    <p className="home-budget-input home-inputs">
                      {a[trip].days[day] &&
                        a[trip].days[day][currentDot] &&
                        a[trip].days[day][currentDot].budget}
                    </p>
                    <p className="home-notes-input  home-inputs">
                      {a[trip].days[day] &&
                        a[trip].days[day][currentDot] &&
                        a[trip].days[day][currentDot].notes}
                    </p>
                  </div>
                </div>
              </div>
              <button
                style={{ marginTop: "20px" }}
                className="home-save-agenda-btn"
                onClick={this.hideTrip}
              >
                Leave Trip
              </button>
            </div>
          );
      });
    }

    // <div className="home-time-agenda-container">
    //               <TimeInput style={{ color: "#fff" }} className="home-clock" disabled mode='12h' okLabel="submit" />
    //             </div>

    // console.log(this.props.currentUserTrips)
    // console.log(day)
    // console.log(currentUserTrips[trip].days[day])
    // console.log(currentUserTrips[trip].days[day].length)

    return (
      <div className="trips-wrapper">
        <Background />
        {!viewTrip && userTrips}
        {viewTrip && userTripsDays}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state.userReducer };
};

export default connect(
  mapStateToProps,
  { userLogin }
)(Profile);

// <div className="profile-container">
//         <div className="profile-wrapper">
//           Profile
//           <form>
//             <input
//               data-cypress-input-username
//               value={this.state.username}
//               className="w3-input w3-animate-input"
//               type="text"
//               style={{ width: "135px" }}
//               placeholder="Username"
//               onChange={e => this.handleUserInput("username", e)}
//             />
//             <input
//               data-cypress-input-email
//               value={this.state.email}
//               className="w3-input w3-animate-input"
//               type="text"
//               style={{ width: "135px" }}
//               placeholder="Email"
//               onChange={e => this.handleUserInput("email", e)}
//             />
//             <input
//               data-cypress-input-firstname
//               value={this.state.firstName}
//               className="w3-input w3-animate-input"
//               type="text"
//               style={{ width: "135px" }}
//               placeholder="First Name"
//               onChange={e => this.handleUserInput("firstName", e)}
//             />
//             <input
//               data-cypress-input-lastname
//               value={this.state.lastName}
//               className="w3-input w3-animate-input"
//               type="text"
//               style={{ width: "135px" }}
//               placeholder="Last Name"
//               onChange={e => this.handleUserInput("lastName", e)}
//             />
//             <button
//               data-cypress-profile-submit
//               onClick={() => {
//                 this.props.createUser(
//                   username,
//                   email,
//                   firstName,
//                   lastName,
//                   userID
//                 );

//                 this.setState({
//                   username: "",
//                   email: "",
//                   firstName: "",
//                   lastName: "",
//                   userID: auth.currentUser.uid || ""
//                 });
//               }}
//             >
//               Submit Profile
//             </button>
//           </form>
//           <div className="profile-trip-codes">
//             <div> Trip Codes </div>
//             <div className="profile-tripname-code">
//               <div>Trip Name</div>
//               <div>Code</div>
//             </div>
//           </div>
//           Previous Trips
//           <div className="profile-previous-trips">
//             <div>Trip Name</div>
//             <div>Trip duration</div>
//           </div>
//         </div>
//       </div>
//     );
