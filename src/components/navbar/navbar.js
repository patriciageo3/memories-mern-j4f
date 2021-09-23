import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';

import useStyles from './styles';
import memories from '../../images/memories.png';

const renderLoggedInView = (styleClasses, user) => (
    <div className={styleClasses.profile}>
        <Avatar className={styleClasses.purple} alt={user.result.name} src={user.result.imageUrl}>
            {user.result.name.charAt(0)}
        </Avatar>
        <Typography className={styleClasses.userName} variant="h6">{user.result.name}</Typography>
        <Button className={styleClasses.logout} variant="contained" color="secondary">Logout</Button>
    </div>
)

const renderGuestView = () => (
    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
)

export const Navbar = () => {
    const styleClasses = useStyles();

    const user = null;

    return (
    <AppBar className={styleClasses.appBar} position="static" color="inherit">
        <div className={styleClasses.brandContainer}>   
            <Typography component={Link} to="/" className={styleClasses.heading} variant="h2" align="center">Memories</Typography>
            <img className={styleClasses.image} src={memories} height="60" alt="Memories-logo" width="60" />
        </div>    
        <Toolbar className={styleClasses.toolbar} >
        {
            user ? renderLoggedInView(styleClasses, user) : renderGuestView()
        }

        </Toolbar>    
    </AppBar>
    );
}

export default Navbar;
