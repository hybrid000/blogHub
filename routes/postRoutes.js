const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');

router.get('/:postId', async (req, res) => {
    try {
        const requestedPostId = req.params.postId;
        const post = await composedPosts.findOne({ _id: requestedPostId });
        if (!post) {
            // Handle the case when the requested post is not found
            return res.status(404).send('Post not found');
        }
        res.render('post', {
            title: post.title,
            content: post.content,
            postId: post._id,
            author: post.author,
        });
    } catch (err) {
        // Handle the error gracefully
        console.error('Error retrieving the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete/:postId', async (req, res) => {
    try {
        const deletePostId = req.params.postId;

        await composedPosts.findOneAndDelete({ _id: deletePostId });
        res.send(
            '<script>alert("Post deleted successfully"); window.location.href = "/";</script>'
        );
    } catch (err) {
        // Handle the error gracefully
        console.error('Error deleting the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit/:postId', async (req, res) => {
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

router.post('/edit/:postId', async (req, res) => {
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
