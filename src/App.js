import React, { useEffect, useState } from 'react';
import { Container, AppBar, Grow, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import PostsContainer from './components/posts/posts-container';
import Form from './components/form/form';
import memories from './images/memories.png';
import { getPosts } from './actions/posts';
import useStyles from './styles';

const App = () => {
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const [ currentId, setCurrentId ] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [ dispatch ]);

    const saveCurrentId = focusedId => {
        setCurrentId(focusedId);
    }
    
    const clearCurrentId = () => setCurrentId(null);

    return (
    <Container maxwidth="lg">
        <AppBar className={styleClasses.appBar} position="static" color="inherit">
            <Typography variant="h2" align="center">Memories</Typography>
            <img className={styleClasses.image} src={memories} height="60" alt="Memories-logo" width="60" />
        </AppBar>
        <Grow in>
            <Container>
                <Grid container className={styleClasses.mainContainer} justify="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <PostsContainer saveCurrentId={saveCurrentId}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentPostId={currentId} clearCurrentPostId={clearCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>

    </Container>
    );
} 

export default App;