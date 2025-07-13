const Order = require("../models/Order");
const User = require("../models/User");
const Subscription = require("../models/Subscription");

// Sample analytics controller
const getAnalyticsData = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalSubscriptions = await Subscription.countDocuments();

    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    res.status(200).json({
      totalUsers,
      totalOrders,
      totalSubscriptions,
      recentOrders,
    });
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Failed to fetch analytics data" });
  }
};

module.exports = { getAnalyticsData };
