const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');
const homeStartingContent =
    'Welcome to Blog Hub, the wacky wonderland where anyone can post about anything! Prepare to unleash your creativity, share your thoughts.';

router.get('/', async (req, res) => {
    const posts = await composedPosts.find({});
    res.render('home', {
        inputhome: homeStartingContent,
        posts: posts,
    });
});

module.exports = router;
