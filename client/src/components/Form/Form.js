import React, {useState, useEffect} from "react";
import useStyles from './styles.js'
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from "../../actions/posts.js";
import { useNavigate } from "react-router";
import ChipInput from 'material-ui-chip-input'
// import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
    const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId): null);
    const [postData, setPostData] = useState({
        title: "",
        courseName: "",
        school: "",
        content: "",
        tags: [],
        selectedFile: ""
    })
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: "",
            courseName: "",
            school: "",
            content: "",
            tags: [],
            selectedFile: ""
        })
    }

    useEffect(() => {
        if (!post?.title) clear();
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, postData))
            // dispatch(createPost(postData, navigate));
            clear();
        } else {
            dispatch(createPost(postData, navigate));
            clear();
        }
    }

    const handleAddChip = (tag) => {
        setPostData({...postData, tags: [...postData.tags, tag]})
    }

    const handleDeleteChip = (tagToDelete) => {
        setPostData({...postData, tags: postData.tags.filter((tag) => tag !== tagToDelete)});
    }

    return(
        <Paper className={classes.paper}> 
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Edit an existing knowledge share' : 'Share your Knowledge'}
                </Typography>
                <TextField 
                name="Title"
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.title} 
                onChange={(e) => {
                    setPostData({ ...postData, title: e.target.value })
                }}
                />
                <TextField 
                name="courseName"
                variant="outlined"
                label="Course Name"
                fullWidth
                value={postData.courseName} 
                onChange={(e) => {
                    setPostData({ ...postData, courseName: e.target.value })
                }}
                />
                <TextField 
                name="school"
                variant="outlined"
                label="School"
                fullWidth
                value={postData.school} 
                onChange={(e) => {
                    setPostData({ ...postData, school: e.target.value })
                }}
                />
                <TextField 
                name="Content"
                variant="outlined"
                label="Content"
                multiline={true}
                minRows={15}
                fullWidth
                value={postData.content} 
                onChange={(e) => {
                    setPostData({ ...postData, content: e.target.value })
                }}
                />
                {/* <TextField 
                name="Tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags} 
                onChange={(e) => {
                    setPostData({ ...postData, tags: e.target.value.split(',') })
                }}
                /> */}
                <ChipInput
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onAdd={(chip) => handleAddChip(chip)}
                    onDelete={(chip) => handleDeleteChip(chip)}
                />
                <div className={classes.fileInput}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => {
                            setPostData({...postData, selectedFile: base64})
                        }}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" onClick={handleSubmit} fullWidth> 
                        Submit
                </Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth> 
                        Clear 
                </Button>
            </form>
        </Paper>
    )
}

export default Form;