// models/Subscription.js
const subscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan" },
  startDate: Date,
  endDate: Date,
  isPaused: { type: Boolean, default: false },
  dailyMeals: {
    type: Map,
    of: Boolean, // true = meal active, false = skipped
    default: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: true,
      Sunday: false,
    },
  },
});
