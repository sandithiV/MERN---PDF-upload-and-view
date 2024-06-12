const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate a unique filename
  },
});

// Multer file filter
const fileFilter = (req, file, cb) => {
  // Accept image and PDF files
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

// Initialize multer with the configured storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;