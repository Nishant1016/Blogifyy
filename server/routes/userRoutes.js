import express from "express";
import {
  registerUser,
  loginUser,
} from "../controllers/userController.js";

import auth from "../middlewares/auth.js";

const userRouter = express.Router();

// Public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// Protected routes (Phase 2)
userRouter.get("/profile", auth, () => {});

export default userRouter;