import User from "../models/User.js";

// Toggle pause/resume
export const togglePause = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user || !user.isSubscribed)
      return res.status(404).json({ message: "Subscription not found." });

    user.isPaused = !user.isPaused;
    await user.save();

    res
      .status(200)
      .json({
        message: `Subscription ${user.isPaused ? "paused" : "resumed"}`,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to toggle pause/resume", error: err.message });
  }
};

// Update individual meal day
export const toggleMealDay = async (req, res) => {
  const userId = req.user.id;
  const { date, status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existing = user.mealSchedule.find(
      (entry) => entry.date.toDateString() === new Date(date).toDateString()
    );

    if (existing) {
      existing.mealStatus = status;
    } else {
      user.mealSchedule.push({ date, mealStatus: status });
    }

    await user.save();
    res.status(200).json({ message: `Meal marked as '${status}' for ${date}` });
  } catch (err) {
    res.status(500).json({ message: "Meal toggle failed", error: err.message });
  }
};

// Get all scheduled meals
export const getMealSchedule = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("mealSchedule");
    res.status(200).json(user.mealSchedule);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not fetch schedule", error: err.message });
  }
};
