import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Grow, Grid } from '@material-ui/core';

import PostsContainer from '../posts/posts-container';
import Form from '../form/form';
import { getPosts } from '../../actions/posts';
import useStyles from './styles';



export const Authenticated = () => {
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
    );
}

export default Authenticated;
