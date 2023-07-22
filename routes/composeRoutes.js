const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');

router.get('/', (req, res) => {
    res.render('compose');
});

router.post('/', async (req, res) => {
    try {
        const post = new composedPosts({
            title: req.body.postTitle,
            author: req.body.authorName,
            content: req.body.postBody,
            originalContent: req.body.postBody, // Fix typo here: req.postBody -> req.body.postBody
        });

        await post.save();
        res.redirect('/');
    } catch (err) {
        // Handle the error gracefully
        console.error('Error saving the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
