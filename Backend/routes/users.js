const express = require('express');
const router = express.Router();
const multer = require('multer');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const User = require('../models/User');
dotenv.config();
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    format: async (req, file) => 'png', // Supports any format
    public_id: (req, file) => file.originalname.split('.')[0], // Public ID
  },
});

const upload = multer({ storage: storage });

// Route to create a new user and upload a single image
router.post('/', upload.single('image'), async (req, res) => {
  try {

    const { name, socialMediaHandle } = req.body;

    // Check if an image is provided
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded. Please provide an image.' });
    }

    const imageUrl = req.file.path; // Store Cloudinary image URL

    const newUser = new User({
      name,
      socialMediaHandle,
      images: [imageUrl], // Store the image URL in an array
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});


module.exports = router;
