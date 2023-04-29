import { actions } from "../constants/actionTypes";

//posts is our state which is initalize to an empty array of posts

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {posts: []}, action) => {
    switch(action.type) {
        case actions.CREATE:
            return {
                ...state, 
                posts: [...state.posts, action.payload] };
        case actions.FETCH_ALL:
            console.log('payload',action.payload.data);
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case actions.UPDATE:
            console.log('reacjs')
            return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
        case actions.DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        case actions.FETCH_BY_SEARCH:
            return {
                ...state, 
                posts: action.payload.data
            }
        case actions.FETCH_POST: 
            return {
                ...state, 
                post: action.payload
            }
        case actions.COMMENT:
            return {
                ...state,
                post: state.posts.map((post) => {
                    if (post._id && action.payload._id) {
                        return action.payload
                    }
                    return post;
                })
            }
        default:
            return state;
    }
}

