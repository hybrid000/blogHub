const mongoose = require('mongoose');

const composeSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    originalContent: String,
    createdDateAndTime:String,
    updatedDateAndTime: String
});

const composedPosts = mongoose.model('composeblog', composeSchema);

module.exports = composedPosts;
