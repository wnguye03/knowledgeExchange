import axios from 'axios';
import { actions } from '../constants/actionTypes';
// const url = 'http://localhost:8080';

const api = axios.create({baseURL: 'http://localhost:8080' });

// export const fetchPosts = () => {
//     const { result } = axios.get(url);
//     console.log(result);
//     return result;
// }


export const getPosts = (page) => async (dispatch) => {
    try {
        const { data: { data, currentPage, numberOfPages } } = await api.get(`/posts?page=${page}`);
        dispatch({type: actions.FETCH_ALL, payload: { data, currentPage, numberOfPages }});
    } catch (err) {
        console.log(err.message)
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const {data: {data}} = await api.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
        console.log('search',data);
        dispatch({type: actions.FETCH_BY_SEARCH, payload: {data}});
    } catch (err) {
        console.log(err.message)
    }
}

export const createPost = (post, navigate) => async(dispatch) => {
    try {
        //data that we get back is a singular post
        const { data } = await api.post('/posts', post);
        // navigate(`/posts/${data._id}`);
        dispatch({type: actions.CREATE, payload: data});
        navigate(`/posts/${data._id}`)
    } catch (err) {
        console.log(err);
    }
}

export const updatePost = (id, updatedPost) => async (dispatch) => {
    try {
        const data = await api.patch(`/posts/${id}`, updatedPost);
        console.log(data)
        dispatch({action: actions.UPDATE, payload: data.data})
    } catch (err) {
        console.log(err);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.delete(`/posts/${id}`);
        dispatch({type: actions.DELETE, payload: id});
    } catch (err) {
        console.log(err);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.get(`/posts/${id}`);
        dispatch({type: actions.FETCH_POST, payload: data });
    } catch (err) {
        console.log(err.message)
    }   
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.post(`/posts/${id}/commentPost`, value);
        dispatch({type: actions.COMMENT, payload: data});

        return data.comments;
    } catch (err) {
        console.log(err);
    }
}