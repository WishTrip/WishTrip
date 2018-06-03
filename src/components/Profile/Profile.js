import React, { Component } from "react";
import "./Profile.css";
import forEach from "lodash.foreach";
// import "w3-css/w3.css";

import { connect } from "react-redux";
import { userLogin } from "../../ducks/userReducer";
import Background from "../Background/Background";
import { auth } from "../../firebase";

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      email: "",
      userID: auth.currentUser ? auth.currentUser.uid : "",
      day: 0,
      trip: 0
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.decrementTrip = this.decrementTrip.bind(this);
    this.incrementTrip = this.incrementTrip.bind(this);
  }

  handleUserInput = (state, e) => {
    this.setState({ [state]: e.target.value });
  };

  decrementTrip() {
    let { trip } = this.state;
    this.setState({
      trip: trip - 1
    });
  }

  incrementTrip() {
    let { trip } = this.state;
    this.setState({
      trip: trip + 1
    });
  }

  render() {
    const { username, email, userID, day, trip } = this.state;
    const { currentUserTrips } = this.props;

    let userTripsDetails;
    currentUserTrips.map((e, i, a) => {
      if (userTripsDetails === undefined) {
        userTripsDetails = (
          <div className="trips-wrapper">
            <div className="home-day-container home-chevron">
              <i
                onClick={this.decrementTrip}
                className={trip === 0 ? null : "fa fa-chevron-left"}
              />
              <h1 className="home-day-text">{a[trip].name}</h1>
              <i
                onClick={this.incrementTrip}
                className={currentUserTrips.length === trip + 1 ? null : "fa fa-chevron-right"}
              />
            </div>
            <div className="trips-input-container">
              <div>
                <h4>{a[trip].origin}</h4>
                <h4>{a[trip].destination}</h4>
              </div>
              <div>
                <h4>{a[trip].starting}</h4>
                <h4>{a[trip].ending}</h4>
              </div>
              <h4>{a[trip].budget}</h4>
              <p>{a[trip].notes}</p>
              <button>View Trip</button>
            </div>
          </div>
        )
      }
    })

    // let userTrips = currentUserTrips.map((e, i, a) => {
    //   // forEach(e, (val, key) => {
    //   //   console.log(key, ": ", val)
    //   // })
    //   console.log(a[0])
    //   return (
    //     <div className="trips-wrapper">
    //       <h1>{e.name}</h1>
    //       <h1 className="home-day-text">Day {day + 1}</h1>
    //       <div className="trips-input-container">
    //         <div>
    //           <h4>{e.origin}</h4>
    //           <h4>{e.destination}</h4>
    //         </div>
    //         <div>
    //           <h4>{e.starting}</h4>
    //           <h4>{e.ending}</h4>
    //         </div>
    //         <h4>{e.budget}</h4>
    //         <p>{e.notes}</p>
    //         <button>View Trip</button>
    //       </div>
    //     </div>
    //   )
    // })

    // let userTrips = currentUserTrips.map((e, i) => {
    //   return (
    //     <div>
    //       <h2>Trip Name</h2>
    //     </div>
    //   )
    // })

    console.log(this.props.currentUserTrips)
    console.log(currentUserTrips.length, trip)

    return (
      <div className="trips-wrapper">
        <Background />
        {userTripsDetails}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { ...state.userReducer };
};

export default connect(mapStateToProps, { userLogin })(Profile);


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