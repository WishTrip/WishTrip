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
    days: [[]]
}

//ACTION TYPES
const USER_LOGIN = "USER_LOGIN";
const SAVE_AGENDA = "SAVE_AGENDA";
const ADD_INITIAL_TRIP_VALUES = "ADD_INITIAL_TRIP_VALUES";
const  COMPLETE_TRIP = " COMPLETE_TRIP";
const SEND_USER_INFO = "SEND_USER_INFO";

//REDUCERS
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case `${USER_LOGIN}`:
        console.log('1', state)
            return { ...state, user: { ...state.user , userinfo: { email: action.payload.email, uid: action.payload.uid }} }
        case `${SAVE_AGENDA}`:
        console.log('2', state)
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
                user: {...state.user, trips: [{...state.user.trips[0], days}]}
            }
        case `${ADD_INITIAL_TRIP_VALUES}`:
        console.log('3', state)
        console.log(action.payload)
        const { tripBudget, tripLocation, tripName, tripNotes } = action.payload
            return { 
                ...state,
                 user: { ...state.user, trips: [ {...state.user.trips[0], tripBudget, tripLocation, tripName, tripNotes} ]}
            }
        case `${ COMPLETE_TRIP}`:
        console.log('4', state)
            return {
                ...state,
                user: {
                    ...state.user,
                    trips: [{
                        ...state.user.trips[0],
                        days: action.payload
                    }]
                }
            }
        case `${SEND_USER_INFO}_FULFILLED` :
        console.log(action.payload.data)
            return { ...state  }
        default: return state;
    }
}

//ACTION CREATORS
export function userLogin(email, uid) {
    return {
        type: USER_LOGIN,
        payload: { email, uid }
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

export function sendUserInfo(user) {
    return {
        type: SEND_USER_INFO,
        payload: axios.post('/api/sendUserInfo', { user })
    }
}