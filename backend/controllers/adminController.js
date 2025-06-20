import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const createToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });

    const admin = new Admin({ email, password });
    await admin.save();

    const token = createToken(admin);
    res.status(201).json({
      message: "Admin registered",
      token,
      admin: { email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(admin);
    res.status(200).json({ token, admin: { email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admin profile" });
  }
};
