import express from "express";
import { userProtect, adminProtect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order (User only)
router.post("/", userProtect, async (req, res) => {
  try {
    const { items, deliveryDate, instructions } = req.body;

    const order = new Order({
      user: req.user._id,
      items,
      deliveryDate,
      instructions,
    });

    await order.save();
    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// @route   GET /api/orders/my
// @desc    Get user's own orders
router.get("/my", userProtect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your orders" });
  }
});

// @route   GET /api/orders
// @desc    Admin: Get all orders
router.get("/", adminProtect, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "identifier");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all orders" });
  }
});

export default router;
