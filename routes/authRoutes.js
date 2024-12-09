const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validateAuth');
const multer = require('multer');
const path = require('path');

// Configure multer for handling multipart form data
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept images only
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF images are allowed.'), false);
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
  files: 1
};

// Multer instance for file uploads
const upload = multer({
  storage,
  fileFilter,
  limits
});

// Middleware to handle file upload errors
const handleUpload = (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: ' File is too large. Maximum size is 5MB'
        });
      }
      return res.status(400).json({
        success: false,
        message: ` Upload error: ${err.message}`
      });
    } else if (err) {
      // An unknown error occurred when uploading
      console.error('Upload error:', err);
      return res.status(400).json({
        success: false,
        message: ` ${err.message}`
      });
    }

    // Log the received data
    console.log('Received registration data:', {
      body: {
        fullName: req.body.fullName,
        email: req.body.email,
        hasPassword: !!req.body.password
      },
      file: req.file ? {
        fieldname: req.file.fieldname,
        originalname: req.file.originalname,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
        size: req.file.size
      } : null
    });

    next();
  });
};

// Auth routes with validation
router.post('/register', upload.single('avatar'), validateRegister, authController.register);

// Login route (no file upload needed)
router.post('/login', (req, res, next) => {
  const plainMulter = multer();
  plainMulter.none()(req, res, next);
}, validateLogin, authController.login);

// Error handling for this router
router.use((err, req, res, next) => {
  console.error('Auth route error:', err);
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: ' File upload error',
      error: err.message
    });
  }
  next(err);
});

module.exports = router;