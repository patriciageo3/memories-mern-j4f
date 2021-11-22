import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

import useStyles from './styles';
import memories from '../../images/memories.png';
import { getProfileFromLocalStorage } from '../../utils'
import { useLogoutAndRedirectHomePage } from '../../hooks';

const renderLoggedInView = (styleClasses, user, onLogoutClick) => (
    <div className={styleClasses.profile}>
        <Avatar className={styleClasses.purple} alt={user.profile.givenName} src={user.profile.imageUrl} data-auto-id="profile-avatar">
            {user.profile.givenName.charAt(0)}
        </Avatar>
        <Typography 
            className={styleClasses.userName} 
            variant="h6" 
            data-auto-id="profile-greeting"
        >
            {`Hi, ${user.profile.givenName}!`}
        </Typography>
        <Button 
            className={styleClasses.logout} 
            variant="contained" 
            color="secondary" 
            onClick={onLogoutClick} 
            data-auto-id="profile-logout"
        >
            Logout
        </Button>
    </div>
)

const renderGuestView = () => (
    <Button component={Link} to="/auth" variant="contained" color="primary" data-auto-id="profile-sign-in">Sign In</Button>
)

export const Navbar = () => {
    const styleClasses = useStyles();
    const location = useLocation();
    const userInfo = getProfileFromLocalStorage();
    const logoutAndRedirectHomePage = useLogoutAndRedirectHomePage()
    const [ user, setUser ] = useState(userInfo);

    useEffect(() => {
        setUser(userInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const onLogoutClick = () => {
        logoutAndRedirectHomePage();
        // setUser(null); -> added in the video, but there is
        // no need to reset this to null as the useEffect above will take care of that
    };

    return (
    <AppBar className={styleClasses.appBar} position="static" color="inherit" data-auto-id='memories-header'>
        <div className={styleClasses.brandContainer}>   
            <Typography 
                component={Link} 
                to="/" 
                className={styleClasses.heading} 
                variant="h2" align="center" 
                data-auto-id="memories-title"
            >
                Memories
            </Typography>
            <img className={styleClasses.image} src={memories} height="60" alt="Memories-logo" width="60" data-auto-id="memories-logo" />
        </div>    
        <Toolbar className={styleClasses.toolbar} data-auto-id="memories-menu" >
        {
            user ? renderLoggedInView(styleClasses, user, onLogoutClick) : renderGuestView()
        }

        </Toolbar>    
    </AppBar>
    );
}

export default Navbar;
