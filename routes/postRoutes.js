const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');


// Creates a new blog
router.post('/', async (req, res) => {
    try {
        const post = new composedPosts({
            title: req.body.postTitle,
            author: req.body.authorName,
            content: req.body.postBody,
            originalContent: req.body.postBody,
        });

        await post.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

// handles the get request to open a post up "/post/:postId"
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
        console.error('Error retrieving the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

// handles delete request and deletes the post "/post/:postId"
router.delete('/:postId', async (req, res) => {
    try {
        const deletePostId = req.params.postId;
        await composedPosts.findOneAndDelete({ _id: deletePostId });
        res.send(
            '<script>alert("Post deleted successfully"); window.location.href = "/";</script>'
        );
    } catch (err) {
        console.error('Error deleting the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

// saves the edited blog / updates the blogs
router.put('/:postId', async (req, res) => {
    console.log("PUT request received and route executed.");
    try {
        const saveButtonClicked = req.body.saveButton !== undefined;
        const discardButtonClicked = req.body.discardButton !== undefined;
        const requestedPostId = req.params.postId;
        if (saveButtonClicked) {
            const data = {
                postTitle: req.body.postTitle,
                authorName: req.body.authorName,
                postBody: req.body.postBody,
            };

            console.log("Data to Update:", data);

            await composedPosts.findByIdAndUpdate(requestedPostId, {
                $set: {
                    title: data.postTitle,
                    content: data.postBody,
                    author: data.authorName,
                },
            });

            console.log("Post Updated Successfully.");
            
        }
        res.redirect(`/post/${requestedPostId}`);

    } catch (err) {
        console.error('Error saving the edited post:', err);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;


