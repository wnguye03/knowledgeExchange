import express from "express";
import { getPostsBySearch, getPosts, createPost, updatePost, deletePost, getPost, commentPost } from "../controller/postController.js";

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/:id', getPost)
router.get('/', getPosts);
router.post('/', createPost);

router.patch('/:id', updatePost);

router.delete('/:id', deletePost);
router.post('/:id/commentPost', commentPost);

export default router;