import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getProfileFromLocalStorage, checkIfTokenExpired } from '../utils';
import { logoutUser } from '../actions/authentication';

export const useNavigateTo = () => {
        const history = useHistory();
        return route => history.push(route);
};


export const useNavigateToHomePage = () => {
        const navigate = useNavigateTo();
        return () => navigate('/');
};

export const useLogoutAndRedirectHomePage = () => {
        const redirectToHomePage = useNavigateToHomePage();
        const dispatch = useDispatch();

        return () =>  dispatch(logoutUser(redirectToHomePage));
};

export const useCheckIfTokenIsExpired = () => {
        const currentUser = getProfileFromLocalStorage();
        const token = currentUser?.token;
        const res = { tokenExpired: false, tokenExists: true };
     
        if (token) {
                const tokenIsExpired = checkIfTokenExpired(token);

                if (tokenIsExpired) {
                        res.tokenExpired = true;
                }
        } else {
                res.tokenExpired = false;
                res.tokenExists = false;
        }

        return res;
};

export const useLogoutAndRedirectIfTokenIsExpired = () => {
        const { tokenExpired, tokenExists } = useCheckIfTokenIsExpired();
        const logoutRedirectHomePage = useLogoutAndRedirectHomePage();
        
        return () => (tokenExpired || !tokenExists) && logoutRedirectHomePage();
       
};