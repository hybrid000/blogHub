const express = require('express');
const router = express.Router();
const aboutContent = 'Content for the contact page goes here';

router.get('/', (req, res) => {
    try {
        res.render('about', { inputabout: aboutContent });
    } catch (err) {
        // Handle the error gracefully
        console.error('Error rendering the about page:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
