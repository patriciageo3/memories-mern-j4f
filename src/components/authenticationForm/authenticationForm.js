import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';

import { Input } from '../common-components'
import useStyles from './styles';
import Icon from '../../images/icon'
import { googleSignin, signup, signin } from '../../actions/authentication';
import { useNavigateToHomePage }  from '../../hooks'; 
import {  
FIRST_NAME,
LAST_NAME,
EMAIL,
PASSWORD,
CONFIRM_PASS 
} from '../../utils/constants';
import { formatStringToCamelCase, turnNameIntoTag } from '../../utils';

const firstName = formatStringToCamelCase(FIRST_NAME);
const lastName = formatStringToCamelCase(LAST_NAME);
const email = formatStringToCamelCase(EMAIL);
const pass = formatStringToCamelCase(PASSWORD);
const confirmPass = formatStringToCamelCase(CONFIRM_PASS);

const INITIAL_STATE_AUTH_FORM = {
    [ firstName ]: '',
    [ lastName ]: '',
    [ email ]: '',
    [ pass ]: '',
    [ confirmPass ]: ''
};


export const AuthenticationForm = () => {
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const redirectToHomePage = useNavigateToHomePage();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [ formData, setFormData ] = useState(INITIAL_STATE_AUTH_FORM);

    console.log('authformData', formData);

    const handleSubmit = event => {
        event.preventDefault();
        if (isSignup) {
            dispatch(signup(formData, redirectToHomePage));
        } else {
            dispatch(signin(formData, redirectToHomePage));
        }
    };
    const handleChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value})
    };
    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);
    const switchMode = () => {
        setIsSignup(prevSetSignup => !prevSetSignup);
        setShowPassword(false);
    };
    const googleSuccess = async res => {
        const profile = res?.profileObj;
        const token = res?.tokenId;
        const authenticationData = { profile, token };

        try {
            dispatch(googleSignin(authenticationData, redirectToHomePage));
        } catch (err) {
            console.log(err)
        }
        console.log('response', res);
    };
    const googleError = (err) => {
        console.log('Google Sign In was not successful. Please try again later!');
        console.log('error', err)
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={styleClasses.paper} elevation={3}>
                <Avatar className={styleClasses.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{ isSignup ? 'Sign up' : 'Sign in' }</Typography>
                <form className={styleClasses.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                        isSignup && (
                            <>
                                <Input name={firstName} label={turnNameIntoTag(FIRST_NAME)} value={formData[firstName]} handleChange={handleChange} half />
                                <Input name={lastName} label={turnNameIntoTag(LAST_NAME)} value={formData[lastName]} handleChange={handleChange} half />
                            </>
                        )
                        }

                        <Input name={email} label={turnNameIntoTag(EMAIL)} value={formData[email]} handleChange={handleChange} type="email" autoFocus />
                        <Input name={pass} label={turnNameIntoTag(PASSWORD)} value={formData[pass]} handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        
                        { isSignup && <Input name={confirmPass} label={turnNameIntoTag(CONFIRM_PASS)} value={formData[confirmPass]} handleChange={handleChange} type="password" /> }
                    </Grid>    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={styleClasses.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
                    <Grid container justify="center">
                        <Typography component="h5"> OR: </Typography>
                    </Grid>
                    <GoogleLogin
                        clientId="1074282772635-adeqrnr02h5piqb5d1d3dvo2aqjeg509.apps.googleusercontent.com"
                        render={renderProps => (
                            <Button className={styleClasses.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                     />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Typography component="h5">
                                { isSignup ? 'Already have an account?' : "Don't have an account?" }
                                <Button onClick={switchMode}>
                                    { isSignup ? 'Sign in' : "Sign Up" }
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                     
                </form>
            </Paper>
        </Container>
    );
}

export default AuthenticationForm;
