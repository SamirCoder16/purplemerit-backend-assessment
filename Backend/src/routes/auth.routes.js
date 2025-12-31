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
  getOnlyUsersForAdmin,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser,
  updateUserStatustoActive,
  updateUserStatustoInActive,
} from "../controllers/auth.controller.js";
import { authenticatedUser } from "../middlewares/auth.middlewares.js";

const authRouter = express.Router();

authRouter.post("/auth/register", registerUserValidator, registerUser);
authRouter.post("/auth/login", loginUserValidator, loginUser);
authRouter.get("/all/users", authenticatedUser, getAllUsers);
authRouter.patch(
  "/auth/update/:id",
  authenticatedUser,
  updateUserValidator,
  updateUser
);

authRouter.post("/auth/forgot-password", forgotPassword);
authRouter.patch("/auth/reset-password/:email", resetPassword);
authRouter.get("/auth/me", authenticatedUser, getMe);
authRouter.post("/auth/logout", authenticatedUser, logoutUser);
authRouter.get("/admin/get-users", authenticatedUser, getOnlyUsersForAdmin);
authRouter.patch("/admin/active/:id", authenticatedUser,updateUserStatustoActive );
authRouter.patch("/admin/inactive/:id", authenticatedUser, updateUserStatustoInActive);

export default authRouter;
