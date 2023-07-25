const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));


// Creates a new blog --compose.ejs
router.post('/', async (req, res) => {
    try {
        const post = new composedPosts({
            title: req.body.postTitle,
            author: req.body.postAuthor,
            content: req.body.postContent,
            originalContent: req.body.postContent,
            createdDateAndTime: new Date()
        });

        await post.save();
        res.redirect('/');

    } catch (err) {
        console.error('Error saving the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

// handles the get req to open a post up "/post/:postId"
router.get('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await composedPosts.findOne({ _id: postId });
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.render('post', {
            title: post.title,
            content: post.content,
            postId: post._id,
            author: post.author,
            createdDateAndTime: post.createdDateAndTime,
            updatedDateAndTime: post.updatedDateAndTime
        });
    } catch (err) {
        console.error('Error retrieving the post:', err);
        res.status(500).send('Internal Server Error');
    }
});

// handles delete request and deletes the post "/post/:postId"
router.delete('/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        await composedPosts.findOneAndDelete({ _id: postId });
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
    try {
        const postId = req.params.postId;
        const saveButtonClicked = req.body.saveButton !== undefined;
        const discardButtonClicked = req.body.discardButton !== undefined;
        if (saveButtonClicked) {
            const data = {
                updatedTitle: req.body.postTitle,
                updatedAuthor: req.body.postAuthor,
                updatedContent: req.body.postContent,
                UcreatedDateAndTime: req.body.postCreatedDateAndTime,
                UupdatedDateAndTime: new Date()
            };

            await composedPosts.findByIdAndUpdate(postId, {
                $set: {
                    title: data.updatedTitle,
                    content: data.updatedContent,
                    author: data.updatedAuthor,
                    updatedDateAndTime: data.UupdatedDateAndTime,
                    createdDateAndTime: data.UcreatedDateAndTime
                }
            });

        }
        res.redirect(`/post/${postId}`);
    } catch (err) {
        console.error('Error saving the edited post:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
