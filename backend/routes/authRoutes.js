import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ identifier, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err); // ✅ See full error in console
    if (err.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// @route   POST /api/auth/login
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({ identifier });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ token, user: { identifier: user.identifier } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// @route   GET /api/auth/me
router.get("/me", protect, async (req, res) => {
  console.log("User from token:", req.user); // 🔍 Debug log
  res.json({ user: req.user });
});

export default router;
