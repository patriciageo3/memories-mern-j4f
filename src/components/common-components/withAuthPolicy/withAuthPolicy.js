import React from 'react';
import { useDispatch } from 'react-redux';

import { useNavigateToHomePage, useCheckIfTokenIsExpired } from '../../../hooks';
import { logoutUser } from '../../../actions/authentication';

export const WithAuthPolicy = ({ children: wrappedComponent }) => {
    const dispatch = useDispatch();
    const { tokenExpired, tokenExists } = useCheckIfTokenIsExpired();
    const redirectToHomePage = useNavigateToHomePage();

    // if token is not expired, use is logged in -> redirect to landing page
    if (!tokenExpired && tokenExists) {
        redirectToHomePage();
        return null;
    } else {
        // if token is expired -> logout & return component
        if (tokenExpired) {
            dispatch(logoutUser());
        }

        // if there is no token -> return component
        return  (
            <div data-auto-id="main-component-container"> 
                { wrappedComponent }
            </div>
        );
    }
}

export default WithAuthPolicy;