const express = require("express");
const Newsletter = require("../models/Newsletter");

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please enter a valid email address.",
        });
    }

    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "You are already subscribed!" });
    }

    await Newsletter.create({ email });

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to our newsletter!",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error. Please try again." });
  }
});

module.exports = router;
