import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
// import {
//   validateRegister,
//   validateLogin,
// } from "../middleware/authValidation.js";

const router = express.Router();

// User routes
router.post("/signup", registerUser);
router.post("/login", loginUser);

// router.post('/register', validateRegister, registerUser);
// router.post('/login', validateLogin, loginUser);

export default router;
