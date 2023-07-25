const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');
const homeStartingContent = 'Welcome to Blog Hub, the wacky wonderland where anyone can post about anything! Prepare to unleash your creativity, share your thoughts.';

const POSTS_PER_PAGE = 3; // Number of blogs to show per page

router.get('/', async (req, res) => {
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
        showPrevious: page > 1, // Show Previous button if the current page is greater than 1
        showNext: totalPosts > page * POSTS_PER_PAGE, // Show Next button if there are more posts to show on the next page
    });
});

// to get to compose blog page
router.get('/compose', (req, res) => {
    res.render('compose');
});
// To get to edit-blog page
router.get('/edit/:postId', async (req, res) => {
    try {
        const editPostId = req.params.postId;
        const post = await composedPosts.findOne({ _id: editPostId });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('edit', {
            title: post.title,
            content: post.content,
            postId: post._id,
            author: post.author,
        });
    } catch (err) {
        // Handle the error gracefully
        console.error('Error retrieving the post for editing:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/about', (req, res) => {
    try {
        res.render('about', { inputabout: aboutContent });
    } catch (err) {
        // Handle the error gracefully
        console.error('Error rendering the about page:', err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
