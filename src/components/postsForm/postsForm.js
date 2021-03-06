import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles'
import {  
    POST_TITLE_NAME,
    POST_FILE_NAME, 
    POST_MESSAGE_NAME, 
    POST_TAGS_NAME 
} from '../../utils/constants';
import { turnNameIntoTag, getProfileFromLocalStorage } from '../../utils'
import { createPost, updatePost } from '../../actions/posts'
import { useLogoutAndRedirectIfTokenIsExpired } from '../../hooks';

const INITIAL_STATE_POST_DATA = {
    [ POST_TITLE_NAME ]: '',
    [ POST_MESSAGE_NAME ]: '',
    [ POST_TAGS_NAME ]: '',
    [ POST_FILE_NAME ]: ''
};

const INPUTS = Object.keys(INITIAL_STATE_POST_DATA);
    
const PostsForm = ({ currentPostId, clearCurrentPostId }) => {
    const styleClasses = useStyles();
    const dispatch = useDispatch();
    const [ postData, setPostData ] = useState(INITIAL_STATE_POST_DATA);
    const [ tagData, setTagData ] = useState('');
    const [ userAction, setUserAction ] = useState(false);
    const allPosts = useSelector(state => state.posts);
    const authData = getProfileFromLocalStorage();
    const userName = authData?.profile?.name;
    const checkTokenAndLogout = useLogoutAndRedirectIfTokenIsExpired();

    useEffect(() => {
        if (currentPostId) {
            const focusedPost = allPosts.find(post => post._id === currentPostId);
            const rawTags = focusedPost.tags.toString();

            if (focusedPost) {
                setPostData(focusedPost);
                setTagData(rawTags);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPostId]);

    useEffect(() => {
        checkTokenAndLogout();
        setUserAction(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAction]);

    const handleChange = event => setPostData({ ...postData, [ event.target.name ]: event.target.value})
    const handleTagChange = event => {
        const rawTags = event.target.value;
        const formattedTags = rawTags.replace(/\s/g, '');

        // we need this to keep showing the actual input while user is writing
        // and not show the formatted value to the user
        setTagData(rawTags);
        setPostData({ ...postData, [ event.target.name ]: formattedTags.split(',')});
    }
    const clearData = () => {
        setPostData(INITIAL_STATE_POST_DATA);
        setTagData('');
        clearCurrentPostId();
        setUserAction(true);
    }
    const handleSubmit = event => {
        event.preventDefault();
        
        if (currentPostId) {
            dispatch(updatePost(currentPostId, { ...postData, name: userName }));
        } else {
            dispatch(createPost({ ...postData, name: userName }));
        }
        clearData();  
    }

    if (!userName) {
        return (
            <Paper className={styleClasses.paper}>
            <Typography variant="h6" align="center">
              {"Please Sign In to create your own memories and like other's memories."}
            </Typography>
          </Paper>
        );
    }
    
    return (
        <Paper className={styleClasses.paper} data-auto-id="memories-form-container">
            <form autoComplete="off" onSubmit={handleSubmit} noValidate className={`${styleClasses.root} ${styleClasses.form}`} data-auto-id="memories-form">
                <Typography variant="h6">{currentPostId ? 'Editing' : 'Creating'} a memory</Typography>
                {
                    INPUTS.map(inputName => {
                        if (inputName === POST_FILE_NAME ) return null
                        return (
                            <TextField
                                key={inputName}
                                name={inputName} 
                                variant="outlined" 
                                label={turnNameIntoTag(inputName)} 
                                fullWidth 
                                value={postData[inputName]}
                                {...inputName === POST_TAGS_NAME && {value: tagData}}
                                onChange={handleChange}
                                {...inputName === POST_TAGS_NAME && {onChange: handleTagChange}}
                                data-auto-id={`memories-field-${inputName}`}
                            />
                        )

                    })
                }
                <div className={styleClasses.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, [ POST_FILE_NAME ]: base64})}
                        data-auto-id="memories-field-choose-file"
                    />
                </div>
                <Button 
                    className={styleClasses.buttonSubmit} 
                    variant="contained" 
                    color="primary" 
                    size="large"
                    type="submit"
                    data-auto-id="submit-memory-cta"
                >
                    Submit
                </Button>
                <Button
                    className={styleClasses.buttonClear} 
                    variant="contained" 
                    color="secondary" 
                    size="small"
                    onClick={clearData}
                    data-auto-id="clear-memory-cta"
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
}

export default PostsForm;