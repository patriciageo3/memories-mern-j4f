import { ACTION_LOGIN_USER, ACTION_LOGOUT_USER, PROFILE, ACTION_SIGNUP_USER } from '../utils/constants';
import * as api from '../api';

export const googleSignin = authenticationData => dispatch => {
    dispatch({
        type: ACTION_LOGIN_USER, payload: authenticationData
    });
} 

export const signin = (formData, redirectToHomePage) => async dispatch => {
    try {
        // sign in user

        const action = {
            type: ACTION_LOGIN_USER,
            payload: '' //data from the API
        };
        dispatch(action);
        redirectToHomePage();

    } catch (error) {
        console.log(`Error signing in: ${error}`);
    }
    
}

export const signup = (formData, redirectToHomePage) => async dispatch => {
    try {
        //sign up user

        const action ={
            type: ACTION_SIGNUP_USER,
            payload: '' //data from the API
        };
        dispatch(action);
        redirectToHomePage();
    } catch (error) {
        console.log(`Error signing up: ${error}`);
    }
}

export const logoutUser = redirectToHomePage => dispatch =>  {
    dispatch({
        type: ACTION_LOGOUT_USER
    });
    redirectToHomePage();
}