import React, {useState, useRef} from "react";
import { Typography, TextField, Button, CircularProgress } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from './styles';
// import { generateUsername } from "unique-username-generator"
import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();
    const commentsRef = useRef();


    const handleClick = async () => {
        const finalComment = `Anonymous user: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');
        commentsRef.current.scrollIntoView({ behaviour: 'smooth' })
    }

    return(
        comments === undefined ? <CircularProgress /> :(<div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant="h6">Comments</Typography>
                {comments.map((comment, index) => (
                    <Typography key={index} gutterBottom variant="subtitle1">
                        {comment}
                    </Typography>
                ))}
                <div ref={commentsRef} />
            </div>
            <div style={{width: '50%'}}>
                <Typography gutterBottom variant="h6">Write a new comment</Typography>
                <TextField 
                    fullWidth
                    multiline={true}
                    minRows={10}
                    variant="outlined"
                    label='comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} variant="contained" onClick={handleClick} color="primary">Submit Content</Button>
            </div>
        </div>
       </div>)
    )
}

export default CommentSection
