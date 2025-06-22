import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const mealScheduleSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  mealStatus: {
    type: String,
    enum: ["on", "off"],
    default: "on",
  },
});

const userSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  isSubscribed: {
    type: String,
    default: false,
  },
  isPaused: {
    type: Boolean,
    default: false,
  },
  subscriptionStart: Date,
  subscriptionEnd: Date,
  mealSchedule: [mealScheduleSchema],
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
