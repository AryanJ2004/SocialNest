const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

require('dotenv').config(); // For Cloudinary credentials

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true // Set to true if using credentials (cookies, HTTP authentication, etc.)
}));

app.use(express.json());
app.use(session({
  secret: 'your-secret-key', // Change this in production
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use((req, res) => {
  res.status(404).send('Path Not Exists');
});
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
