const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');
const homeStartingContent = 'Welcome to Blog Hub, the wacky wonderland where anyone can post about anything! Prepare to unleash your creativity, share your thoughts.';

const POSTS_PER_PAGE = 3; // Number of blogs to show per page

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the current page number from the query parameter
        const totalPosts = await composedPosts.countDocuments({}); // Get the total number of blog posts

        // Calculate the total number of pages based on the number of posts and posts per page
        const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

        // Calculate the skip value to get the correct posts for the current page
        const skip = (page - 1) * POSTS_PER_PAGE;

        // Get the posts for the current page, sorted by the latest date (newest posts first)
        const posts = await composedPosts
            .find({})
            .sort({ _id: 'desc' }) // Assuming _id is the field representing the creation date of the post
            .skip(skip)
            .limit(POSTS_PER_PAGE);

        res.render('home', {
            inputhome: homeStartingContent,
            posts: posts,
            currentPage: page,
            totalPages: totalPages,
        });
    } catch (err) {
        // Handle the error gracefully
        console.error('Error fetching blog posts:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
