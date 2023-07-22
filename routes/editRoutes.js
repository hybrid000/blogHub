const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');

// to get a post for editing
router.get('/:postId', async (req, res) => {
    try {
        const editPostId = req.params.postId;
        const post = await composedPosts.findOne({ _id: editPostId });
        if (!post) {
            // Handle the case when the requested post is not found
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

// to save an edited post
router.post('/:postId', async (req, res) => {
    try {
        const saveButtonClicked = req.body.saveButton !== undefined;
        const discardButtonClicked = req.body.discardButton !== undefined;
        const requestedPostId = req.params.postId;

        if (saveButtonClicked) {
            const updatedTitle = req.body.postTitle;
            const updatedAuthor = req.body.authorName;
            const updatedContent = req.body.postBody;

            await composedPosts.findByIdAndUpdate(requestedPostId, {
                $set: {
                    title: updatedTitle,
                    content: updatedContent,
                    author: updatedAuthor,
                },
            });
        }

        res.redirect('/posts/' + requestedPostId);
    } catch (err) {
        // Handle the error gracefully
        console.error('Error saving the edited post:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
