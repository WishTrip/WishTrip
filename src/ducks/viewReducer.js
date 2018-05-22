const initialState = {
    burgerFlag: false
}

const TOGGLE_HAMBURGER_BTN = "TOGGLE_HAMBURGER_BTN";

export function toggleHamburgerBtn() {
    return {
        type: TOGGLE_HAMBURGER_BTN
    }
}

export default function viewReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_HAMBURGER_BTN:
            return {
                ...state,
                burgerFlag: !state.burgerFlag
            };
        default:
            return state;
    }
}
