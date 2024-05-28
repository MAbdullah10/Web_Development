const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.use(express.static('public'));

// Render login page
router.get('/login', (req, res) => {
  res.render('login', { layout: false });
});

// Handle login form submission
router.post('/login', async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.redirect('/signUp');
  
  const passCompare = await bcrypt.compare(req.body.password, user.password);
  if (!passCompare) {
    return res.redirect('/user/login');
  }
  req.session.user = user;
  return res.redirect('/');
});

// Render signup page
router.get('/SignUp', (req, res) => {
  res.render('SignUp', { layout: false });
});

// Handle signup form submission
router.post('/SignUp', async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists. Please login.' });
    }

    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      password: hashpassword
      
    });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create user' });
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/');
});

module.exports = router;
