import * as api from '../api';
import { ACTION_FETCH_ALL, ACTION_CREATE_POST, ACTION_UPDATE_POST, ACTION_DELETE_POST, ACTION_UPDATE_LIKE_COUNT } from '../utils/constants';

export const getPosts = () => async dispatch => {
  try {
    const { data } = await api.fetchPosts();
    const action = {
        type: ACTION_FETCH_ALL,
        payload: data
    }

    dispatch(action);

  } catch (error) {
      console.log(`Error fetching posts: ${error}`);
  }
}

export const createPost = newPost => async dispatch => {
  try {
   const { data } = await api.createPost(newPost)
    const action = {
      type: ACTION_CREATE_POST,
      payload: data
    }

    dispatch(action)

  } catch (error) {
    console.log(`Error creating post: ${error}`);
  }
}

export const updatePost = (postId, newPostData) => async dispatch => {
  try {
    const { data } = await api.updatePost(postId, newPostData);
    const action = {
      type: ACTION_UPDATE_POST,
      payload: data
    }

    dispatch(action);
  } catch (error) {
    console.log(`Cannot update post ${postId}`, error);
  }
}

export const deletePost = postId => async dispatch => {
  try {
    await api.deletePost(postId);

    const action = {
      type: ACTION_DELETE_POST,
      payload: postId
    }
    
    dispatch(action);
  } catch (error) {
    console.log(`Cannot delete post ${postId}`, error);
  }
}

export const updateLikeCount = currentPost => async dispatch =>{
  try {
    const { data } = await api.updateLikeCount(currentPost);

    const action = {
      type: ACTION_UPDATE_LIKE_COUNT,
      payload: data
    }

    dispatch(action);
  } catch (error) {
    console.log(`Cannot update like count for post: ${currentPost._id}`)
  }
}