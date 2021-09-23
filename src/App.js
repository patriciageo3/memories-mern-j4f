import React from 'react';
import { Container } from '@material-ui/core';


import Navbar from './components/navbar/navbar'
import Home from './components/home/home'
import Authenticated from './components/authenticated/authenticated'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxwidth="lg">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/" component={Authenticated} />
                </Switch>
            </Container>
        </BrowserRouter> 
    );
} 

export default App;