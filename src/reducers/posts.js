import { ACTION_FETCH_ALL, ACTION_CREATE_POST, ACTION_UPDATE_POST, ACTION_DELETE_POST, ACTION_UPDATE_LIKE_COUNT } from '../utils/constants';

const reducer = (state = [], action) => {
    switch(action.type) {
        case ACTION_CREATE_POST:
            return [ ...state, action.payload ];

        case ACTION_FETCH_ALL:
            return action.payload;

        case ACTION_UPDATE_POST:
        case ACTION_UPDATE_LIKE_COUNT:
            return state.map(post => post._id === action.payload._id ? action.payload : post);

        case ACTION_DELETE_POST:
            return state.filter(post => post._id !== action.payload);

        default:
            return state;
    }
}

export default reducer;