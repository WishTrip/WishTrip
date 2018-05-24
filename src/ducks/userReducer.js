import axios from 'axios';

//INTITIAL STATE
const initialState = {
    users: []
}

//ACTION TYPES
const CREATE_USER = "CREATE_USER";

//REDUCERS
export default function userReducer(state = initialState, action) {
    switch(action.type){
        case `${CREATE_USER}_FULFILLED` :
            return { ...state, users: action.payload.data }
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