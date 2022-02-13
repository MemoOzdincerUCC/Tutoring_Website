

import { SET_KEY, GET_KEY } from './actions';
import session from "./session";
import keys from "./keys";

const initialState = {
    isLoggedIn: session.get(keys.isLoggedIn) == 'true' ? true : false,
    isLoading: false,
    showLogin: false,
    showSignup: false,
    showMeeting: false,
    meetingToId: null,
    user: session.getParsed(keys.user) || null,
    startConversation: session.get(keys.startConversation) || null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_KEY:
            return {
                ...state,
                [action.payload.key]: action.payload.value
            };

        case GET_KEY:
            return {
                ...state
            };

        default:
			return state;
    }
}

export default reducer;