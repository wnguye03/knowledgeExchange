import React, { useEffect }from "react";
import { Paper, Typography, CircularProgress, Divider, Card, AppBar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";

const PostDetails = () => {
    const { post, posts } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();
    useEffect(() => {
        dispatch(getPost(id))
    }, [id, dispatch]);

    console.log('post sd',post)
    useEffect(() => {
        if(post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags?.join(',') }));
        }
    }, [post, dispatch]);

    if (!post) return null;

    const openPost = (_id) => {
        navigate(`/posts/${_id}`);
    }


    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper style={{padding:'20px', borderRadius: '15px'}} elevation={6}>
             <Link to='/' style={{textDecoration: 'none'}}>
                <AppBar className={classes.appBar} position="static" color="black">
                    <Typography variant="h2" align="center" className={classes.heading}>
                        Knowledge Exchange
                    </Typography>
                </AppBar>
            </Link>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary">{post.tags}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.content}</Typography>
                    <Typography variant="bodt1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }}/>
                    <CommentSection post={post}/>
                </div>
            </div>
            <div className={classes.imageSection}>
                <img className={classes.media} src={post.selectedFile} alt=""/>
            </div>
            {!!recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">Further Recommended Knowledge</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({title, school, courseName, selectedFile, _id }) => (
                            <Card style={{marginTop: '10px'}} elevation={6}>
                            <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subTitle2">{school}</Typography>
                                <Typography gutterBottom variant="subTitle2">{courseName}</Typography>
                                <img src={selectedFile} width='200px' />
                            </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default PostDetails;