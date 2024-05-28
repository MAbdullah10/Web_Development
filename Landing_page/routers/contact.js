const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

router.get('/auth/contact-us', (req, res) => {
  res.render('contact-us');
});

router.post('/auth/contact-us', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({
      name: name,
      email: email,
      message: message
    });

    await newContact.save();
    res.redirect('/')
  } catch (err) {
    console.error(err);
    res.send('There was an error saving your message. Please try again.');
  }
});

module.exports = router;
