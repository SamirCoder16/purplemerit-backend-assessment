import express from "express";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from "../middlewares/validators/auth.validator.js";
import {
  forgotPassword,
  getAllUsers,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
} from "../controllers/auth.controller.js";
import { authenticatedUser } from "../middlewares/auth.middlewares.js";

const authRouter = express.Router();

authRouter.post("/auth/register", registerUserValidator, registerUser);
authRouter.post("/auth/login", loginUserValidator, loginUser);
authRouter.get("/all/users",authenticatedUser, getAllUsers);
authRouter.patch(
  "/auth/update/:id",
  authenticatedUser,
  updateUserValidator,
  updateUser
);

authRouter.post('/auth/forgot-password', authenticatedUser, forgotPassword);
authRouter.patch('/auth/reset-password/:email', authenticatedUser, resetPassword);
authRouter.get('/auth/me', authenticatedUser, getMe);
authRouter.post('/auth/logout', authenticatedUser, logoutUser);

export default authRouter;
