const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    match: [/^[\d\s\+\-\(\)]{7,15}$/, 'Please enter a valid phone number']
  },
  serviceRequired: {
    type: String,
    required: [true, 'Service is required'],
    enum: ['web-design', 'web-development', 'ecommerce', 'seo', 'full-package', 'other']
  },
  budget: {
    type: String,
    required: [true, 'Budget is required'],
    enum: ['under-10k', '10k-25k', '25k-50k', '50k-1lac', 'above-1lac']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    minlength: [10, 'Message must be at least 10 characters']
  }
}, { timestamps: true });

module.exports = mongoose.model('Quote', quoteSchema);