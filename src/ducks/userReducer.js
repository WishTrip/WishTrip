import axios from "axios";
import forEach from "lodash.foreach";

//INTITIAL STATE
const initialState = {
  // user: {
  //     userinfo: {firstname, lastname, email},
  //     trips: [0: {tripName, tripStarting, tripEnd, tripTotal, days: [days]},
  //             ] ...
  //     }
  currentUserTrips: [],
  user: {
    userinfo: {},
    trips: []
  },
  days: [[]]
};

//ACTION TYPES
const USER_LOGIN = "USER_LOGIN";
const SAVE_AGENDA = "SAVE_AGENDA";
const ADD_INITIAL_TRIP_VALUES = "ADD_INITIAL_TRIP_VALUES";
const COMPLETE_TRIP = "COMPLETE_TRIP";
const SEND_USER_INFO = "SEND_USER_INFO";
const SEND_TRIP_INFO = "SEND_TRIP_INFO";
const GET_USER_TRIPS = "GET_USER_TRIPS";
const HANDLE_NEW_DAY = "HANDLE_NEW_DAY";

//REDUCERS
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${USER_LOGIN}`:
      return {
        ...state,
        user: {
          ...state.user,
          userinfo: { email: action.payload.email, uid: action.payload.uid }
        }
      };
    case HANDLE_NEW_DAY:
      state.days.push([])
      return {

        ...state,
        user: { ...state.user, trips: [{ ...state.user.trips[0], days: state.days }] }

      }
    case `${SAVE_AGENDA}`:
      let { days } = state;

      let currentDay = action.payload.currentDay - 1;
      let currentAgenda = action.payload.currentAgenda - 1;



      days[currentDay][currentAgenda] = action.payload;

      return {
        ...state,
        user: { ...state.user, trips: [{ ...state.user.trips[0], days }] }
      };
    case `${ADD_INITIAL_TRIP_VALUES}`:
      const {
        name,
        origin,
        destination,
        starting,
        ending,
        budget,
        notes
      } = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          trips: [
            {
              ...state.user.trips[0],
              name,
              origin,
              destination,
              starting,
              ending,
              budget,
              notes,
              days: state.days
            }
          ]
        }
      };
    case `${COMPLETE_TRIP}`:
      return {
        ...state,
        days: [[]],
        user: {
          ...state.user,
          trips: [
            {
              ...state.user.trips[0],
              days: action.payload
            }
          ]
        }
      };
    case `${GET_USER_TRIPS}_FULFILLED`:
      let trips = action.payload.data.userinfo.trips;
      let tripsArr = [];
      forEach(trips, (val, key) => tripsArr.push(val));
      return {
        ...state,
        user: {
          ...state.user,
          userinfo: {
            email: action.payload.data.userinfo.userinfo.email,
            uid: action.payload.data.uid
          }
        },
        currentUserTrips: tripsArr
      };
    case `${SEND_USER_INFO}_FULFILLED`:
      let updatedTripsArr = [];
      forEach(action.payload.data, (val, key) => updatedTripsArr.push(val));
      console.log(updatedTripsArr)
      return { ...state, currentUserTrips: updatedTripsArr };
    default:
      return state;
  }
}

//ACTION CREATORS
export function userLogin(email, uid) {
  return {
    type: USER_LOGIN,
    payload: { email, uid }
  };
}

export function saveAgenda(

  currentDay,
  currentAgenda,
  name,
  destination,
  activity,
  budget,
  notes,
  time
) {
  return {
    type: SAVE_AGENDA,
    payload: {

      currentDay,
      currentAgenda,
      name,
      destination,
      activity,
      budget,
      notes,
      time
    }
  };
}

export function addInitialTripValues(
  name,
  origin,
  destination,
  starting,
  ending,
  budget,
  notes
) {
  return {
    type: ADD_INITIAL_TRIP_VALUES,
    payload: { name, origin, destination, starting, ending, budget, notes }
  };
}

export function completeTrip(days) {
  return {
    type: COMPLETE_TRIP,
    payload: days
  };
}

export function sendUserInfo(user, uid, email) {
  return {
    type: SEND_USER_INFO,
    payload: axios.post("/api/sendUserInfo", { user, uid, email })
  };
}

export function getUserTrips(uid) {
  return {
    type: GET_USER_TRIPS,
    payload: axios.get(`/api/getUserTrips/${uid}`)
  };
}
export function handleNewDay() {
  return {
    type: HANDLE_NEW_DAY
  }
}

