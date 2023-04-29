import React from "react";
import useStyles from './styles.js'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete.js';
import MoreHorizonIcon from '@material-ui/icons/MoreHorizOutlined.js'
import moment from 'moment';
import {useDispatch} from 'react-redux'
import { deletePost } from '../../../actions/posts.js'
import { useNavigate } from 'react-router-dom'

const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const openPost = () => {
        navigate(`/posts/${post._id}`);
    }
    return(
        <Card className={classes.card} raised elevation={6}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>

            <div className={classes.overlay}>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" 
                onClick={() => {
                    setCurrentId(post._id)
                }}
                >
                    <MoreHorizonIcon fontSize="default"/>
                </Button>
            </div>
            <ButtonBase className={classes.cardAction} onClick={openPost}>
            <div className={classes.details}>
            <CardContent>
                <Typography variant="body2" color="textSecondary" gutterBottom>Tags: {post.tags.map((tag) => (
                    ` ${tag}`
                ))}</Typography>
                    <Typography className={classes.title} variant="h6" gutterBottom>School: {post.school} </Typography>
                    <Typography className={classes.title} variant="h6" gutterBottom>Course Name: {post.courseName}</Typography>
                </CardContent>
                </div>
                </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={() => {dispatch(deletePost(post._id))}}>
                        <DeleteIcon />
                        Delete
                    </Button>
                    
                </CardActions>
                
        </Card>
    )
}

export default Post;

