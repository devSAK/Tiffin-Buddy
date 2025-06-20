// backend/routes/analyticsRoutes.js
import express from "express";
import { adminProtect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

// @route   GET /api/analytics/summary
// @desc    Get overall analytics summary
// @access  Admin only
router.get("/summary", adminProtect, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();

    const totalRevenueAgg = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ["$items.quantity", "$items.price"] },
          },
        },
      },
    ]);

    const totalRevenue =
      totalRevenueAgg.length > 0 ? totalRevenueAgg[0].totalRevenue : 0;

    const latestOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "identifier");

    res.json({
      users: userCount,
      orders: orderCount,
      revenue: totalRevenue,
      latestOrders,
    });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
});

export default router;
