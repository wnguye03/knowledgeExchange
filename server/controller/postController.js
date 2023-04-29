import PostMessage from "../models/postMessage.js";
import express from 'express';
import mongoose from 'mongoose';

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getPosts = async (req, res, next) => {
    const { page } = req.query;
    try{
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});
        const posts = await PostMessage.find().sort({_id: -1}).limit(LIMIT).skip(startIndex);


        // console.log(posts)
        // return res.status(200).json(posts);
        res.locals.posts = posts;
        res.locals.currentPage = page;
        res.locals.total = total;
        res.locals.limit = LIMIT;
        res.json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total/LIMIT)})
    } catch (err) {

        res.status(404).json({message: err.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    console.log(newPost)
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({message: err.message});
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('no post with that ID');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {_id, ...post}, { new: true });

    res.json(updatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with that ID');

    await PostMessage.findByIdAndDelete(id);

    res.json({message: "post deleted sucessfully"})
}

export const getPostsBySearch = async (req, res) => {
     const { searchQuery, tags } = req.query;
     console.log(searchQuery)
     console.log(tags)
    try {
        const title = new RegExp(searchQuery, 'i');

        const posts = await PostMessage.find({ $or: [{title}, {tags: { $in: tags.split(',')}}] });
        console.log(posts);

        res.json({data: posts});

    } catch (err) {

        res.status(404).json({message: err.message})

    }
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const value = req.body;
    try{

        const post = await PostMessage.findById(id);

        post.comments.push(...Object.keys(value));
        // console.log(post.comments)
    
        const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
        res.json(updatedPost);

    } catch (err) {
        res.status(404).json({message: err.message})
    }
}