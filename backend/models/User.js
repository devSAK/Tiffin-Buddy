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
  isSubscribed: {
    type: Boolean,
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

const User = mongoose.model("User", userSchema);
export default User;
