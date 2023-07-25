const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');
const axios = require('axios');

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
        // Handle the error gracefully
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
        // Handle the error gracefully
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
        // Handle the error gracefully
        console.error('Error deleting the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

// saves the edited blog / updates the blog
router.put('/:postId', async (req, res) => {
    try {
        const requestedPostId = req.params.postId;
        const data = {
            postTitle: req.body.postTitle,
            authorName: req.body.authorName,
            postBody: req.body.postBody,
        };

        await composedPosts.findByIdAndUpdate(requestedPostId, {
            $set: {
                title: data.postTitle,
                content: data.postBody,
                author: data.authorName,
            },
        });

        res.redirect(`/post/${requestedPostId}`);
    } catch (err) {
        // Handle the error gracefully
        console.error('Error saving the edited post:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;


// // saves the edited blog / updates the blog
// router.put('/:postId', async (req, res) => {
//     try {
//         const { saveButton, discardButton, postTitle, authorName, postBody } = req.body;
//         const saveButtonClicked = saveButton !== undefined;
//         const discardButtonClicked = discardButton !== undefined;
//         const requestedPostId = req.params.postId;

//         if (saveButtonClicked) {
//             const updatedTitle = postTitle;
//             const updatedAuthor = authorName;
//             const updatedContent = postBody;

//             await composedPosts.findByIdAndUpdate(requestedPostId, {
//                 $set: {
//                     title: updatedTitle,
//                     content: updatedContent,
//                     author: updatedAuthor,
//                 },
//             });
//         }

//         res.redirect(`/post/${requestedPostId}`);
//     } catch (err) {
//         // Handle the error gracefully
//         console.error('Error saving the edited post:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

