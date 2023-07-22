const express = require('express');
const router = express.Router();
const aboutContent =
    'Content for the contact page goes here';
router.get('/', (req, res) => {
    res.render('about', { inputabout: aboutContent });
});

module.exports = router;
