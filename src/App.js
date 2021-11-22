import React from 'react';
import { Container } from '@material-ui/core';


import Navbar from './components/navbar/navbar'
import Home from './components/home/home'
import AuthenticationForm from './components/authenticationForm/authenticationForm'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" component={AuthenticationForm} />
                </Switch>
            </Container>
        </BrowserRouter> 
    );
} 

export default App;