import axios from 'axios';

//INTITIAL STATE
const initialState = {
    users: [],
    trip: []
}

//ACTION TYPES
const CREATE_USER = "CREATE_USER";
const SAVE_AGENDA = "SAVE_AGENDA";

//REDUCERS
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case `${CREATE_USER}_FULFILLED`:
            return { ...state, users: action.payload.data }
        case `${SAVE_AGENDA}`:
            let newTrip = state.trip.slice();
            newTrip.push(action.payload)
            return {
                ...state,
                trip: newTrip
            }
        default: return state;
    }
}

//ACTION CREATORS
export function createUser(username, email, firstName, lastName) {
    return {
        type: CREATE_USER,
        payload: axios.post('/api/createUser', { username, email, firstName, lastName })
    }
}


export function saveAgenda(name, destination, budget, notes, time) {
    return {
        type: SAVE_AGENDA,
        payload: { name, destination, budget, notes, time }
    }
}