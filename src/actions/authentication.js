import { ACTION_LOGIN_USER, ACTION_LOGOUT_USER, PROFILE, ACTION_SIGNUP_USER } from '../utils/constants';
import { saveToLocalStorage, saveProfileWithGivenName, removeLocalStorageItem } from '../utils';
import * as api from '../api';

export const googleSignin = (authenticationData, redirectToHomePage) => dispatch => {
    const action = {
        type: ACTION_LOGIN_USER, payload: authenticationData
    };
    
    dispatch(action);
    saveToLocalStorage(PROFILE, authenticationData);
    redirectToHomePage();
} 

export const signin = (formData, redirectToHomePage) => async dispatch => {
    try {
        const { data } = await api.signinUser(formData);

        const action = {
            type: ACTION_LOGIN_USER,
            payload: data
        };
        dispatch(action);
        saveProfileWithGivenName(PROFILE, data);
        redirectToHomePage();
    } catch (error) {
        console.log(`Error signing in: ${error}`);
    }
    
}

export const signup = (formData, redirectToHomePage) => async dispatch => {
    try {
        const { data } = await api.signupUser(formData);

        const action ={
            type: ACTION_SIGNUP_USER,
            payload: data
        };
        dispatch(action);
        saveProfileWithGivenName(PROFILE, data);
        redirectToHomePage();
    } catch (error) {
        console.log(`Error signing up: ${error}`);
    }
}

export const logoutUser = redirectToHomePage => dispatch =>  {
    dispatch({
        type: ACTION_LOGOUT_USER
    });
    removeLocalStorageItem(PROFILE);
    redirectToHomePage && redirectToHomePage();
}