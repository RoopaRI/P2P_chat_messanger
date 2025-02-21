const express = require("express");
const User = require("../models/User");

const router = express.Router();

// SignUp Route
router.post("/signup", async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or mobile already exists
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or Mobile already exists" });
    }

    const newUser = new User({ name, email, mobile });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email or Mobile number already registered" });
    }
    res.status(500).json({ message: "Error signing up", error });
  }
});

module.exports = router;
