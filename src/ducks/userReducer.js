import axios from 'axios';

//INTITIAL STATE
const initialState = {
    // user: {
    //     userinfo: {firstname, lastname, email}, 
    //     trips: [0: {tripName, tripStarting, tripEnd, tripTotal, days: [days]},
    //             ] ...
    //     }
    user: {
        userinfo: {},
        trips: []
    },
    trip: [],
    days: [[]]
}

//ACTION TYPES
const CREATE_USER = "CREATE_USER";
const SAVE_AGENDA = "SAVE_AGENDA";
const ADD_INITIAL_TRIP_VALUES = "ADD_INITIAL_TRIP_VALUES";
const  COMPLETE_TRIP = " COMPLETE_TRIP";

//REDUCERS
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case `${CREATE_USER}_FULFILLED`:
            return { ...state, users: action.payload.data }
        case `${SAVE_AGENDA}`:
            let { days } = state;
            let { newDay } = action.payload;
            let currentDay = action.payload.currentDay - 1;
            let currentAgenda = action.payload.currentAgenda - 1;

            if (newDay) {
                days.push([])
            }

            days[currentDay][currentAgenda] = action.payload

            return {
                ...state,
                days: days
            }
        case `${ADD_INITIAL_TRIP_VALUES}`:
            return { 
                ...state,
                 user: {...state.user.userinfo, trips: [action.payload]}
            }
        case `${ COMPLETE_TRIP}`:
            return {
                ...state,
                user: {
                    // ...state.user.userinfo,
                    trips: [{
                        ...state.user.trips[0],
                        days: action.payload
                    }]
                }
            }
        default: return state;
    }
}

//ACTION CREATORS
export function createUser(username, email, firstName, lastName, userID) {
    console.log(username, email, firstName, lastName, userID)
    return {
        type: CREATE_USER,
        payload: axios.post('/api/createUser', { username, email, firstName, lastName, userID })
    }
}


export function saveAgenda(newDay, currentDay, currentAgenda, name, destination, activity, budget, notes, time) {
    return {
        type: SAVE_AGENDA,
        payload: { newDay, currentDay, currentAgenda, name, destination, activity, budget, notes, time }
    }
}

export function addInitialTripValues(tripName, tripLocation, tripBudget, tripNotes) {
    return {
        type: ADD_INITIAL_TRIP_VALUES,
        payload: { tripName, tripLocation, tripBudget, tripNotes }
    }
}

export function completeTrip(days) {
    return {
        type: COMPLETE_TRIP,
        payload: days
    }
}