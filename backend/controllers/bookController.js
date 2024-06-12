const Book = require('../models/book'); // Import your Book model
const upload = require('../multer'); // Import the multer configuration

// Create a new book
const createBook = async (req, res) => {
  try {
    const { bookName, authorName, language, category } = req.body;
    const imageFile = req.files?.image ? req.files.image[0].path : null;
    const bookFile = req.files?.bookFile ? req.files.bookFile[0].path : null;

    const newBook = new Book({
      bookName,
      authorName,
      language,
      category,
      imageFile,
      bookFile,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createBook,
  getAllBooks,
};