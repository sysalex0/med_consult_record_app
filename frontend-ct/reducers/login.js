import {SET_LOGIN_ID} from "../actions/login";

const defaultState = {
    id: null,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case SET_LOGIN_ID:{
            return {
                ...state,
                id: action.payload
            }
        }
        default:
            return state
    }
}
