import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

// Helper to generate JWT token
const createToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// POST /api/admin/signup
export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();

    const token = createToken(newAdmin);
    res.status(201).json({
      message: "Admin registered",
      token,
      admin: { email: newAdmin.email },
    });
  } catch (error) {
    console.error("Admin signup error:", error.message);
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

// POST /api/admin/login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(admin);
    res.status(200).json({
      message: "Login successful",
      token,
      admin: { email: admin.email },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// GET /api/admin/profile (protected)
export const getAdminProfile = async (req, res) => {
  try {
    const admin = req.admin; // Already fetched by middleware
    res.status(200).json({
      email: admin.email,
      id: admin._id,
    });
  } catch (error) {
    console.error("Admin profile error:", error.message);
    res.status(500).json({ message: "Error fetching admin profile" });
  }
};
