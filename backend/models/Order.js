import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        title: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    deliveryDate: { type: Date },
    instructions: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
