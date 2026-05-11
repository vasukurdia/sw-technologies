const express = require("express");
const Contact = require("../models/Contact");
const User = require("../models/User");
const Quote = require("../models/Quote");
const Newsletter = require("../models/Newsletter");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found." });
    }
    res.json({ success: true, message: "Contact deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.get("/quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json({ success: true, count: quotes.length, data: quotes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

router.get("/newsletter", async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
