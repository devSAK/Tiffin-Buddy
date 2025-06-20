import express from "express";
import {
  togglePause,
  toggleMealDay,
  getMealSchedule,
} from "../controllers/subscriptionController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/pause", authMiddleware, togglePause);
router.post("/toggle-meal", authMiddleware, toggleMealDay);
router.get("/schedule", authMiddleware, getMealSchedule);

export default router;
