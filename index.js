if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const multer = require('multer');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));

// MongoDB Connection with retry logic
const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/medyosystem';
    console.log('Attempting to connect to MongoDB at:', mongoURL);
    
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    
    console.log('✅ Connected to MongoDB successfully');
    return true;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    return false;
  }
};

// Initial connection
(async () => {
  let connected = await connectDB();
  if (!connected) {
    console.log('Initial connection failed, retrying...');
    // Retry connection every 5 seconds
    const retryInterval = setInterval(async () => {
      connected = await connectDB();
      if (connected) {
        clearInterval(retryInterval);
      }
    }, 5000);
  }
})();

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Global error handler:', {
    error: err.message,
    stack: err.stack,
    body: req.body,
    path: req.path
  });
  
  res.status(500).json({
    success: false,
    message: '❌ Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Gracefully shutdown on uncaught exception
  server.close(() => {
    process.exit(1);
  });
});