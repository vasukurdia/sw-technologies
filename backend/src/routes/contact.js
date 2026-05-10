const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Server-side validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email.' });
    }
    if (!/^[\d\s\+\-\(\)]{7,15}$/.test(phone.trim())) {
      return res.status(400).json({ success: false, message: 'Please enter a valid phone number.' });
    }
    if (message.trim().length < 20) {
      return res.status(400).json({ success: false, message: 'Message must be at least 20 characters.' });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you within 24 hours.',
      data: { id: contact._id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;