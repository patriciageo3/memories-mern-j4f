import axios from 'axios';

const URL ='https://memories-just-for-fun.herokuapp.com/posts'; 
// const URL = '/posts'
// notes: tutorial had this as: 'http://localhost:5000/posts', but "http://localhost:5000/" needs to go into package.json as 'proxy'
// https://stackoverflow.com/questions/45367298/could-not-proxy-request-pusher-auth-from-localhost3000-to-http-localhost500
// Nkoro Joseph Ahamefula answer
// later on when deployed, proxy became: "https://memories-just-for-fun.herokuapp.com/", but also need to add the full link above as URL to work in heroku 

export const fetchPosts = () => axios.get(URL);

export const createPost = newPost => axios.post(`${URL}/new`, newPost);

export const updatePost = (id, updatedPostData) => axios.patch(`${URL}/${id}`, updatedPostData);

export const deletePost = id => axios.delete(`${URL}/${id}`);

export const updateLikeCount = currentPost => axios.patch(`${URL}/${currentPost._id}/update-likes`, currentPost);
