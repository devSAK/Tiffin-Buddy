// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      // 🔓 Extract token
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      // 🔎 Find user
      const foundUser = await User.findById(decoded.id).select("-password");
      console.log("Found user:", foundUser);

      if (!foundUser) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = foundUser;
      next();
    } catch (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
