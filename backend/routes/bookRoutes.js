const express = require('express');
const router = express.Router();
const cors = require('cors');
const bookController = require('../controllers/bookController');
const upload = require('../multer'); // Import the multer configuration

// Route for creating a new book
router.post(
  '/books',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'bookFile', maxCount: 1 },
  ]),
  bookController.createBook
);

// Route for fetching all books
router.get('/books', bookController.getAllBooks);

module.exports = router;