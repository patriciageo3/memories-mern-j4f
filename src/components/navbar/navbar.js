import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

import useStyles from './styles';
import memories from '../../images/memories.png';
import { getProfileFromLocalStorage } from '../../utils'
import { logoutUser } from '../../actions/authentication';
import { useNavigateToHomePage } from '../../hooks'

const renderLoggedInView = (styleClasses, user, onLogoutClick) => (
    <div className={styleClasses.profile}>
        <Avatar className={styleClasses.purple} alt={user.profile.givenName} src={user.profile.imageUrl}>
            {user.profile.givenName.charAt(0)}
        </Avatar>
        <Typography className={styleClasses.userName} variant="h6">{`Hi, ${user.profile.givenName}!`}</Typography>
        <Button className={styleClasses.logout} variant="contained" color="secondary" onClick={onLogoutClick}>Logout</Button>
    </div>
)

const renderGuestView = () => (
    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
)

export const Navbar = () => {
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const redirectToHomePage = useNavigateToHomePage();
    const [ user, setUser ] = useState(getProfileFromLocalStorage());

    useEffect(() => {
        //const token = user?.token;

        //jwt logic

        setUser(getProfileFromLocalStorage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const onLogoutClick = () => {
        dispatch(logoutUser(redirectToHomePage));
        // setUser(null); -> added n the video, but there is
        // no need to reset this to null as the useEffect above will take care of that
    };

    return (
    <AppBar className={styleClasses.appBar} position="static" color="inherit">
        <div className={styleClasses.brandContainer}>   
            <Typography component={Link} to="/" className={styleClasses.heading} variant="h2" align="center">Memories</Typography>
            <img className={styleClasses.image} src={memories} height="60" alt="Memories-logo" width="60" />
        </div>    
        <Toolbar className={styleClasses.toolbar} >
        {
            user ? renderLoggedInView(styleClasses, user, onLogoutClick) : renderGuestView()
        }

        </Toolbar>    
    </AppBar>
    );
}

export default Navbar;
