const mongoose = require('mongoose');

const composeSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    originalContent: String,
    createdDateAndTime:Date,
    updatedDateAndTime: Date
});

const composedPosts = mongoose.model('composeblog', composeSchema);

module.exports = composedPosts;
