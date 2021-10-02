import { ACTION_LOGIN_USER, ACTION_LOGOUT_USER } from '../utils/constants';

export const loginUser = authenticationData => ({
    type: ACTION_LOGIN_USER, payload: authenticationData
});

export const logoutUser = () => ({
    type: ACTION_LOGOUT_USER
});