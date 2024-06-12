const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  bookName: { type: String, required: true },
  authorName: { type: String, required: true },
  language: { type: String, required: true },
  category: { type: String, required: true },
  imageFile: { type: String, required: true },
  bookFile: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;