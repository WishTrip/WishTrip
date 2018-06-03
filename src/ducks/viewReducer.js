const initialState = {
    burgerFlag: false,
    loginFlag: false
}

const TOGGLE_HAMBURGER_BTN = "TOGGLE_HAMBURGER_BTN";
const TOGGLE_LOGIN = "TOGGLE_LOGIN";

export function toggleHamburgerBtn() {
    return {
        type: TOGGLE_HAMBURGER_BTN
    }
}

export function toggleLogin() {
    return {
        type: TOGGLE_LOGIN
    }
}

export default function viewReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_HAMBURGER_BTN:
            return {
                ...state,
                burgerFlag: !state.burgerFlag
            };
        case TOGGLE_LOGIN :
            return { ...state, loginFlag: !state.loginFlag }
        default:
            return state;
    }
}
