const express = require('express');
const Quote = require('../models/Quote');

const router = express.Router();

// POST /api/quote
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, serviceRequired, budget, message } = req.body;

    // Validation
    if (!name || !email || !phone || !serviceRequired || !budget || !message) {
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
    if (message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
    }

    const quote = await Quote.create({ name, email, phone, serviceRequired, budget, message });

    res.status(201).json({
      success: true,
      message: 'Quote request submitted! We will contact you within 24 hours.',
      data: { id: quote._id }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

module.exports = router;