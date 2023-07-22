const express = require('express');
const router = express.Router();
const composedPosts = require('../models/composeModel');


// to get a post to editing
router.get('/:postId', async (req, res) => {
    const editPostId = req.params.postId;
    const post = await composedPosts.findOne({ _id: editPostId });
    res.render('edit', {
        title: post.title,
        content: post.content,
        postId: post._id,
        author: post.author,
    });
});
// to save an edited post
router.post('/:postId', async (req, res) => {
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
        res.redirect('/posts/' + requestedPostId);
    } else {
        res.redirect('/posts/' + requestedPostId);
    }
});

module.exports = router;
