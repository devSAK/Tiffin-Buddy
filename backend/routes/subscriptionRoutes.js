import express from "express";
import {
  togglePause,
  toggleMealDay,
  getMealSchedule,
} from "../controllers/subscriptionController.js";
import Subscription from "../models/Subscription.js";
import { userProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pause", userProtect, togglePause);
router.post("/toggle-meal", userProtect, toggleMealDay);
router.get("/schedule", userProtect, getMealSchedule);
router.get("/me", userProtect, async (req, res) => {
  try {
    console.log("Decoded user from token:", req.user); // Add this for debugging
    const subscriptions = await Subscription.find({ user: req.user._id });
    res.json(subscriptions);
  } catch (error) {
    console.error("Subscription fetch error:", error); // Log actual error
    res.status(500).json({
      message: "Failed to fetch subscription",
      error: error.message || "Unknown error",
    });
  }
});

export default router;
