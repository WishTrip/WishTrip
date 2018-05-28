import axios from 'axios';

//INTITIAL STATE
const initialState = {
    user: [],
    trip: [],
    days: [[]]
}

//ACTION TYPES
const USER_LOGIN = "USER_LOGIN";
const SAVE_AGENDA = "SAVE_AGENDA";

//REDUCERS
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case `${USER_LOGIN}`:
            return { ...state, user: { email: action.payload.email, uid: action.payload.uid }}
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