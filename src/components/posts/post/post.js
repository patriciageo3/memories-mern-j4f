
import React from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


import { deletePost, updateLikeCount } from '../../../actions/posts';
import { LikePost } from '../../common-components';
import { getProfileFromLocalStorage } from '../../../utils'

import useStyles from './styles'

const Post = ({ post, saveCurrentId: saveCurrentIdParent }) => {
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const currentUser = getProfileFromLocalStorage();
    const currentUserId = currentUser?.profile?._id || currentUser?.profile?.googleId;
    const isUserCreator = currentUserId === post?.creator;

    console.log('selectedFile', post);

    const saveCurrentIdInternal = event => {
        event.preventDefault();

        saveCurrentIdParent(post._id)
    }
    
    return (
        <Card className={styleClasses.card} data-auto-id="memories-post-card">
            <CardMedia className={styleClasses.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div className={styleClasses.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={styleClasses.overlay2}>
            {
                isUserCreator && (
                    <Button style={{ color: 'white' }} size="small" onClick={saveCurrentIdInternal}>
                        <MoreHorizIcon fontSize="default" />
                    </Button>
                )
            }      
            </div>
            <div className={styleClasses.details}>
                <Typography variant="body2" color="textSecondary" component="h2">{post.tags && post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography className={styleClasses.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={styleClasses.cardActions}>
                <Button size="small" color="primary" disabled={!currentUser?.token} onClick={() => dispatch(updateLikeCount(post))}> 
                <LikePost post={post} currentUserId={currentUserId}/>
                </Button>
                {
                    isUserCreator && (
                        <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                            <DeleteIcon fontSize="small" /> 
                            Delete
                        </Button>
                    )
                } 
            </CardActions>
        </Card>
        );
}

export default Post;