const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to check if admin is logged in
const isAdminLoggedIn = (req, res, next) => {
  if (req.session && req.session.adminLoggedIn) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // In a real application, you would check these credentials against a database
  if (username === 'admin' && password === 'password') {
    req.session.adminLoggedIn = true;
    req.session.adminUsername = username;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    return res.json({ message: 'Logged out successfully' });
  });
});

router.get('/profile', isAdminLoggedIn, (req, res) => {
  res.json({ username: req.session.adminUsername });
});

router.get('/users', isAdminLoggedIn, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

module.exports = router;
