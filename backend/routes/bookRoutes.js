const express = require('express');
const router = express.Router();
const cors = require('cors');
const bookController = require('../controllers/bookController');
const upload = require('../multer'); // Import the multer configuration
const Book = require('../models/book')

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

// Route for fetching a book's PDF file
router.get('/books/:bookId/pdf', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const pdfFilePath = book.bookFile;     // Assuming bookFile contains the path to the PDF file
    console.log('Serving PDF file:', pdfFilePath);

    res.sendFile(pdfFilePath, { root: '.' }, (err) => {
      if (err) {
        console.error('Error serving PDF file:', err); // Log any errors
        res.status(500).json({ error: 'Failed to serve PDF file' });
      }
    }); 
  } catch (err) {
    console.error('Error fetching PDF:', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;