import { useHistory } from 'react-router-dom';

export const useNavigateTo = () => {
        const history = useHistory();
        return route => history.push(route);
};


export const useNavigateToHomePage = () => {
        const navigate = useNavigateTo();
        return () => navigate('/');
}