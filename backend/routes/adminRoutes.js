import express from "express";
import {
  adminSignup,
  adminLogin,
  getAdminProfile,
} from "../controllers/adminController.js";
import { adminProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin signup and login
router.post("/signup", adminSignup);
router.post("/login", adminLogin);

// Protected route
router.get("/profile", adminProtect, getAdminProfile);

export default router;
