import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';

import Post from './post/post'
import useStyles from './styles'

const PostsContainer = ({ saveCurrentId }) => {
    const styleClasses = useStyles();
    const posts = useSelector(state =>  state.posts);

    console.log('le posts', posts);
    
    return !posts.length ? <CircularProgress /> : (
       <Grid className={styleClasses.mainContainer} container alignItems="stretch" spacing={3}>
           {
               posts.map(post => (
                   <Grid key={post._id} item xs={12} sm={6}> 
                        <Post post={post} saveCurrentId={saveCurrentId}/>
                   </Grid>
               ))
           }
       </Grid>
       )
   
}

export default PostsContainer;