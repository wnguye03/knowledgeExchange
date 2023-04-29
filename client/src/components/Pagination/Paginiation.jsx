import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from '../Pagination/styles';
import { Link, Route } from 'react-router-dom';
import Home from "../Home/Home";

import { getPosts } from "../../actions/posts";

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [dispatch, page]);
    
    return (
        <Pagination 
            classes={{ul: classes.ul}}
            count={numberOfPages}
            page={Number(page) || 1}
            varient='outlined'
            color="primary"
            renderItem={(item) => (
                <Link to={`/posts?page=${item.page}`}><PaginationItem {...item}/></Link>
            )}
        />
    )
}

export default Paginate