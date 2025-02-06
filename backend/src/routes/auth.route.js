import express from "express";

import {
  checkAuth,
  getAllUser,
  LoginController,
  LogoutController,
  SignupController,
} from "../controllers/auth.controller.js";
import { config } from "dotenv";
config();
import { protectedRoute } from "../middleware/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/signup", SignupController);
authRouter.post("/login", LoginController);
authRouter.post("/logout", LogoutController);
authRouter.get("/check", protectedRoute, checkAuth);
authRouter.get("/getAllUsers", protectedRoute, getAllUser);

export default authRouter;
