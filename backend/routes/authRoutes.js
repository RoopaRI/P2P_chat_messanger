const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Fetch all users
router.get("/users", async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  });

// ✅ Fetch user details by ID
router.get("/user/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id, { password: 0 }); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user details", error });
    }
  });

// SignUp Route
router.post("/signup", async (req, res) => {
  const { name, email, mobile } = req.body;
  try {
    if (!name || !email || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email or mobile already exists
    let user = await User.findOne({ $or: [{ email }, { mobile }] });
    if (user) {
      return res.status(200).json({ message: "User reconnected!", user });
    }

    // Create new user if not found
    user = new User({ name, email, mobile });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

module.exports = router;
