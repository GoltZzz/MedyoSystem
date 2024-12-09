const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPEG, PNG, GIF) are allowed!'));
  }
}).single('avatar');

// Register controller
exports.register = async (req, res) => {
  try {
    console.log('Registration request received:', {
      body: req.body,
      file: req.file
    });

    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      console.error('Missing required fields:', { fullName: !!fullName, email: !!email, password: !!password });
      return res.status(400).json({ 
        success: false,
        message: '❌ All fields are required'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already registered:', email);
      return res.status(400).json({ 
        success: false,
        message: '❌ Email is already registered' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    let avatarUrl = '';

    // Upload to Cloudinary if there's a file
    if (req.file) {
      console.log('Processing avatar upload:', {
        filename: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      });

      try {
        // Convert buffer to base64
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'medyo/avatars',
          resource_type: 'auto',
          transformation: [
            { width: 200, height: 200, crop: 'fill' },
            { quality: 'auto' }
          ]
        });
        avatarUrl = result.secure_url;
        console.log('Avatar uploaded successfully:', avatarUrl);
      } catch (cloudinaryError) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return res.status(500).json({ 
          success: false,
          message: '❌ Failed to upload avatar' 
        });
      }
    }

    // Create new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      avatar: avatarUrl
    });

    await user.save();
    console.log('User registered successfully:', {
      id: user._id,
      fullName: user.fullName,
      email: user.email
    });

    res.status(201).json({
      success: true,
      message: '✅ Registration successful! Please log in.',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    // Check for MongoDB validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: '❌ Validation failed',
        errors: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message
        }))
      });
    }

    // Check for MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: '❌ Email is already registered'
      });
    }

    res.status(500).json({ 
      success: false,
      message: '❌ Server error during registration. Please try again.' 
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email); // Log login attempt

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid login - user not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Invalid login - wrong password:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful:', email);
    res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    // Log the full error details
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ message: 'Server error' });
  }
};
