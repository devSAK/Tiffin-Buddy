import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// User signup
export const registerUser = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const existingUser = await User.findOne({ identifier });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ identifier, password: hashedPassword });
    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      token,
      user: { identifier: newUser.identifier, role: newUser.role },
    });
  } catch (err) {
    console.error("User signup error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

// User login
export const loginUser = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await User.findOne({ identifier });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);
    res.json({ token, user: { identifier: user.identifier, role: user.role } });
  } catch (err) {
    console.error("User login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
