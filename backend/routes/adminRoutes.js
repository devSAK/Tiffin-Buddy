import express from "express";
import Admin from "../models/Admin.js";
import { adminSignup, adminLogin } from "../controllers/adminController.js";
import { userProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin signup and login
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// Protected route
router.get("/profile", userProtect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Error in admin/profile:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
