import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./DummyPlan.css";
import Background from "../Background/Background";
import { connect } from "react-redux";
import { toggleHamburgerBtn } from "../../ducks/viewReducer";
import {
  saveAgenda,
  completeTrip,
  sendUserInfo
} from "../../ducks/userReducer";
import TimeInput from "material-ui-time-picker";
import DummyAgenda from "../DummyAgenda/DummyAgenda";

import { auth } from "../../firebase";
//thisuser.trips
import DummyTripToMap from "./DummyTripMap";
//thisuser.trips[0].days
var thisuser = {
  trips: [
    {
      name: "Aaron Family Trip",
      startDate: new Date(),
      endDate: new Date(),
      startLocation: "Dallas, TX",
      endLocation: "Nashville, TN",
      cost: "$10,000",
      days: [
        [
          {
            name: "jarids birthday",
            budget: "$200",
            notes: 12
          },
          {
            name: "jarids birthday",
            budget: "$200",
            notes: 13
          },

          {
            name: "aarons birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          }
        ],
        [
          {
            name: 1,
            budget: "$200",
            notes: 11
          },
          {
            name: 2,
            budget: "$200",
            notes: 21
          },
          {
            name: "joes birthday",
            budget: "$200",
            notes: 22
          },
          {
            name: "joes birthday",
            budget: "$200",
            notes: 23
          }
        ],
        [
          {
            name: 3,
            budget: "$200",
            notes: 31
          },
          {
            name: "jacobs birthday",
            budget: "$200",
            notes: 32
          },
          {
            name: "jacobs birthday",
            budget: "$200",
            notes: 33
          }
        ],
        [
          {
            name: 4,
            budget: "$200",
            notes: 41
          },
          {
            name: "joes move in day",
            budget: "$200",
            notes: 42
          },
          {
            name: "joes move in day",
            budget: "$200",
            notes: 43
          }
        ]
      ],
      hotels: [
        "placeholderURL.com",
        { name: "hotel1", price: "$2,500", image: "image" },
        { name: "hotel2", price: "$2,500", image: "image" },
        { name: "hotel3", price: "$2,500", image: "image" },
        { name: "hotel4", price: "$2,500", image: "image" },
        { name: "hotel5", price: "$2,500", image: "image" },
        { name: "hotel6", price: "$2,500", image: "image" }
      ]
    },
    {
      name: "Orlando Family Trip",
      startDate: new Date(),
      endDate: new Date(),
      startLocation: "Dallas, TX",
      endLocation: "Nashville, TN",
      cost: "$10,000",
      days: [
        [
          {
            name: "jarids birthday",
            budget: "$200",
            notes: 12
          },
          {
            name: "jarids birthday",
            budget: "$200",
            notes: 13
          },

          {
            name: "aarons birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          }
        ],
        [
          {
            name: 1,
            budget: "$200",
            notes: 11
          },
          {
            name: 2,
            budget: "$200",
            notes: 21
          },
          {
            name: "joes birthday",
            budget: "$200",
            notes: 22
          },
          {
            name: "joes birthday",
            budget: "$200",
            notes: 23
          }
        ],
        [
          {
            name: 3,
            budget: "$200",
            notes: 31
          },
          {
            name: "jacobs birthday",
            budget: "$200",
            notes: 32
          },
          {
            name: "jacobs birthday",
            budget: "$200",
            notes: 33
          }
        ],
        [
          {
            name: 4,
            budget: "$200",
            notes: 41
          },
          {
            name: "joes move in day",
            budget: "$200",
            notes: 42
          },
          {
            name: "joes move in day",
            budget: "$200",
            notes: 43
          }
        ]
      ],
      hotels: [
        "placeholderURL.com",
        { name: "hotel1", price: "$2,500", image: "image" },
        { name: "hotel2", price: "$2,500", image: "image" },
        { name: "hotel3", price: "$2,500", image: "image" },
        { name: "hotel4", price: "$2,500", image: "image" },
        { name: "hotel5", price: "$2,500", image: "image" },
        { name: "hotel6", price: "$2,500", image: "image" }
      ]
    },
    {
      name: "yolo dog Trip",
      startDate: new Date(),
      endDate: new Date(),
      startLocation: "Dallas, TX",
      endLocation: "Nashville, TN",
      cost: "$10,000",
      days: [
        [
          {
            name: "jarids birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          },
          {
            name: "jarids birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          },
          {
            name: "jarids birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          }
        ],
        [
          {
            name: "joes birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          },
          {
            name: "joes birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          },
          {
            name: "joes birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          }
        ],
        [
          {
            name: "jacobs birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          },
          {
            name: "jacobs birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          },
          {
            name: "jacobs birthday",
            budget: "$200",
            notes: "ice cream, lots of ice cream"
          }
        ]
      ],
      hotels: [
        "placeholderURL.com",
        { name: "hotel1", price: "$2,500", image: "image" },
        { name: "hotel2", price: "$2,500", image: "image" },
        { name: "hotel3", price: "$2,500", image: "image" },
        { name: "hotel4", price: "$2,500", image: "image" },
        { name: "hotel5", price: "$2,500", image: "image" },
        { name: "hotel6", price: "$2,500", image: "image" }
      ]
    }
  ]
};

class DummyPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrip: 0
    };
  }
  updateCurrentTrip = val => {
    console.log(val);
    this.setState({ currentTrip: val });
  };

  render() {
    console.log(this.state.currentTrip);
    const { days } = this.props;
    let amountOfDays = days.length;
    let mappedTrips = thisuser.trips.map((e, i, a) => {
      console.log(i, this.state.currentTrip, a[i]);
      return (
        <DummyTripToMap
          currentTrip={this.state.currentTrip === i ? true : false}
          updateCurrentTrip={this.updateCurrentTrip}
          trips={thisuser.trips}
          mapthis={e}
          currentTripIndex={this.state.currentTrip}
        />
      );
    });
    console.log(this.props);
    return <div className="blahblah">{mappedTrips}</div>;
  }
}

const mapStateToProps = state => ({
  ...state.viewReducer,
  ...state.userReducer
});

export default connect(mapStateToProps, {
  toggleHamburgerBtn,
  saveAgenda,
  completeTrip,
  sendUserInfo
})(DummyPlan);
