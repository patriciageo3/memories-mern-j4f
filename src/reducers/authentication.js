import { ACTION_LOGIN_USER, ACTION_LOGOUT_USER } from '../utils/constants';

const initialState = {
    isLoggedIn: false,
    user: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_LOGIN_USER:
            return {...state, isLoggedIn: !!action?.payload?.token, user: action?.payload};

        case ACTION_LOGOUT_USER:
            return {...state, ...initialState};

        default:
            return state;
    }
}

export default reducer;