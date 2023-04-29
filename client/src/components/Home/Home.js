import React, {useEffect, useState} from "react";
import { Container, AppBar, Typography, Grow, Grid, Paper, TextField, Button } from '@material-ui/core'
import Posts from "../Posts/Posts.js";
import Form from "../Form/Form.js";
import useStyles from "../Home/styles.js"
import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts.js";
import Paginate from "../Pagination/Paginiation.jsx";
import { Link, useLocation, useNavigate} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

function useQuery() {
    return new URLSearchParams(useNavigate().search)
}
 
const Home = () => {
    const [currentId, setCurrentID] = useState(null);
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const classes = useStyles();
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    //fetching all post with useEffect so bassically on componentDidMount once the page is render fire get Post to get back post
    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [dispatch, currentId])

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history("/")
        }
    }

    return(
        <Container maxWidth="lg">
            <Link to='/' style={{textDecoration: 'none'}}>
                <AppBar className={classes.appBar} position="static" color="inherit">
                    <Typography variant="h2" align="center" className={classes.heading}>
                        Knowledge Exchange
                    </Typography>
                </AppBar>
            </Link>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit">
                            <TextField 
                                name="Search"
                                variant="outlined"
                                label="Search Course Materials" 
                                onKeyPress={handleKeyPress}
                                fullWidth 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                            <ChipInput 
                                style={{margin: '10px 0'}}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant="outlined"
                            />
                            <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">
                                Search
                            </Button>
                        </AppBar>
                        <Grid item xs={12} sm={8} md={9}>
                            <Posts setCurrentId={setCurrentID}/>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <Paper elevation={6} >
                                <Paginate className={classes.pagination} page={page}/>
                            </Paper>
                            <Form currentId={currentId} setCurrentId={setCurrentID}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default Home;