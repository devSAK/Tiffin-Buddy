import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  // try {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const user = new User({ identifier, password: hashedPassword });
  //   await user.save();
  //   return res.status(201).json({ message: "Signup successful" });
  // } catch (err) {
  //   if (err.code === 11000) {
  //     return res.status(409).json({ message: "User already exists" });
  //   }
  //   return res
  //     .status(500)
  //     .json({ message: "Signup failed", error: err.message });
  // }
  try {
    const existingUser = await User.findOne({ identifier });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ identifier, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      message: "Signup successful",
      token,
      user: { identifier: user.identifier, role: user.role },
    });
  } catch (err) {
    console.error("Signup error:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
});

router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({ identifier });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role); // make sure this function works
    res.json({ token, user: { identifier: user.identifier, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

export default router;
