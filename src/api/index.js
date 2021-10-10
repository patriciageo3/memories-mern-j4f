import axios from 'axios';

import { getProfileFromLocalStorage } from '../utils';

//const URL ='https://memories-just-for-fun.herokuapp.com/posts'; 
 const POSTS_URL = '/posts';
 const USER_URL = '/user';
 const API = axios.create({ baseURL: 'http://localhost:5000/' });
 API.interceptors.request.use(req => {
    const profile = getProfileFromLocalStorage();

    if (!!profile) {
        req.headers.authorization = `Bearer ${profile.token}`;
    }

    return req;
 });
// notes: tutorial had this as: 'http://localhost:5000/posts', but "http://localhost:5000/" needs to go into package.json as 'proxy'
// https://stackoverflow.com/questions/45367298/could-not-proxy-request-pusher-auth-from-localhost3000-to-http-localhost500
// Nkoro Joseph Ahamefula answer
// later on when deployed, proxy became: "https://memories-just-for-fun.herokuapp.com/" 
// also need to add the full link above as URL to work in heroku 

export const fetchPosts = () => API.get(POSTS_URL);
export const createPost = newPost => API.post(`${POSTS_URL}/new`, newPost);
export const updatePost = (id, updatedPostData) => API.patch(`${POSTS_URL}/${id}`, updatedPostData);
export const deletePost = id => API.delete(`${POSTS_URL}/${id}`);
export const updateLikeCount = currentPost => API.patch(`${POSTS_URL}/${currentPost._id}/update-likes`, currentPost);

export const signinUser = userData => API.post(`${USER_URL}/signin`, userData);
export const signupUser = userData => API.post(`${USER_URL}/signup`, userData);
