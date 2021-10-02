import { combineReducers } from 'redux';

import posts from './posts';
import authentication from './authentication';

export default combineReducers({
    posts,
    authentication
});