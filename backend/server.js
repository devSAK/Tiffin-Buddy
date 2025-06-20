// server.js (ES Module version)

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
