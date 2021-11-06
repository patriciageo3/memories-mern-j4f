
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import decode from 'jwt-decode';

import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { deletePost, updateLikeCount } from '../../../actions/posts';
import { LikePost } from '../../common-components';
import { getProfileFromLocalStorage } from '../../../utils';
import { logoutUser } from '../../../actions/authentication';
import { useNavigateToHomePage } from '../../../hooks';

import useStyles from './styles'

const Post = ({ post, saveCurrentId: saveCurrentIdParent }) => {
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const [userAction, setUserAction] = useState(false);
    const currentUser = getProfileFromLocalStorage();
    const redirectToHomePage = useNavigateToHomePage();
    const currentUserId = currentUser?.profile?._id || currentUser?.profile?.googleId;
    const isUserCreator = currentUserId === post?.creator;

    useEffect(() => {
        const token = currentUser?.token;
           
        if (token) {
            const decodedToken = decode(token);
            const tokenIsExpired = decodedToken.exp * 1000 < new Date().getTime();

            if (tokenIsExpired) {
                dispatch(logoutUser(redirectToHomePage));
            }
        }
        setUserAction(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAction]);

    const saveCurrentIdInternal = event => {
        event.preventDefault();

        saveCurrentIdParent(post._id);
        setUserAction(true);
    }

    const onLikeClick = () => {
        dispatch(updateLikeCount(post));
        setUserAction(true);
    }

    const onDeleteClick = () => {
        dispatch(deletePost(post._id));
        setUserAction(true);
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
                <Button size="small" color="primary" disabled={!currentUser?.token} onClick={onLikeClick}> 
                <LikePost post={post} currentUserId={currentUserId} />
                </Button>
                {
                    isUserCreator && (
                        <Button size="small" color="primary" onClick={onDeleteClick}>
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