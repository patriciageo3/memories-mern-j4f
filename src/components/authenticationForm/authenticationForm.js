import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Input } from '../common-components'
import useStyles from './styles';



export const AuthenticationForm = () => {
    const styleClasses = useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = () => {};
    const handleChange = () => {};
    const handleShowPassword = () => setShowPassword(prevShowPassword => !prevShowPassword);
    const switchMode = () => {
        setIsSignup(prevSetSignup => !prevSetSignup);
        setShowPassword(false);
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
                                <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )
                        }

                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" autoFocus />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
                    </Grid>    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={styleClasses.submit}>
                        { isSignup ? 'Sign Up' : 'Sign In' }
                    </Button>
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
