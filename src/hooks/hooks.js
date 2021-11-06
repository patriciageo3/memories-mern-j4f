import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { getProfileFromLocalStorage } from '../utils';
import { logoutUser } from '../actions/authentication';

export const useNavigateTo = () => {
        const history = useHistory();
        return route => history.push(route);
};


export const useNavigateToHomePage = () => {
        const navigate = useNavigateTo();
        return () => navigate('/');
}

export const useCheckIfTokenIsExpired = () => {
        const redirectToHomePage = useNavigateToHomePage();
        const dispatch = useDispatch();
        const currentUser = getProfileFromLocalStorage();
        const token = currentUser?.token;
        
        return () => {
                if (token) {
                        const decodedToken = decode(token);
                        const tokenIsExpired = decodedToken.exp * 1000 < new Date().getTime();

                        if (tokenIsExpired) {
                                dispatch(logoutUser(redirectToHomePage));
                        }
                }
        }
       
}