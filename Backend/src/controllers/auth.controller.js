import { validationResult } from "express-validator";
import authRepository from "../service/auth.service.js";
import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import redisClient from "../config/redis.config.js";
import { sendMail } from "../utils/sendMail.js";
import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userName, email, password, role } = req.body;
    if (!userName || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "User already exist use another" });
      return;
    }
    const newUser = await authRepository.createUser({
      userName,
      email,
      password,
      role,
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      ENV.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res
      .status(201)
      .json({ message: "User register Successfull", token, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "all fields are required!" });
      return;
    }
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "user not Found" });
      return;
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, ENV.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ message: "Login Sucessfull", token, user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const currentUserId = req.user?.id; // user from middleware

    const cachedKey = `allUsers:exclude:${currentUserId}`;
    const cachedUsers = await redisClient.get(cachedKey);
    if (cachedUsers) {
      return res.status(200).json(cachedUsers);
    }

    const result = await authRepository.getAllUsers(currentUserId);
    console.log("Fetched Users:", result);

    if (!result || result.users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    await redisClient.set(cachedKey, JSON.stringify(result), { ex: 3600 });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOnlyUsersForAdmin = async (req, res) => {
  try {
    const role = req?.user?.role?.toLowerCase();
    if (role !== "admin") {
      return res.status(403).json({ message: "Forbidden access" });
    }

    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { users, totalUsers } = await authRepository.getOnlyUsers({
      page,
      limit,
    });

    res.status(200).json({
      users,
      pagination: {
        totalUsers,
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        limit,
      },
    });
  } catch (error) {
    console.log("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const userId = req.params.id;
    const { userName } = req.body;

    if (!userName) {
      res.status(400).json({ message: "all fields are required" });
      return;
    }
    const user = await authRepository.findUserById(userId);
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    const updatedUser = await authRepository.updateUserById(userId, {
      userName,
    });

    const token = jwt.sign(
      { id: updatedUser._id, role: updatedUser.role },
      ENV.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res
      .status(200)
      .json({ message: "user updated successfully", token, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(404)
      .json({ message: "validation failed", error: errors.array() });
    return;
  }
  try {
    const { email } = req.body;
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    // Generate a password reset token
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const normalizeEmail = email.toLowerCase();

    redisClient.set(`passwordReset:${normalizeEmail}`, otp, {
      EX: 15 * 60, // Expire in 15 minutes
    });
    await sendMail(email, "Password Reset OTP", otp);

    res.status(200).json({ message: "Password reset OTP sent to email" });
  } catch (error) {
    console.error("Error generating password reset token:", error);
  }
};

export const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json({ errors: errors.array() });
    return;
  }
  try {
    const { email } = req.params;
    const { newPassword, otp } = req.body;
    const normalizeEmail = email.toLowerCase();
    const storedOtp = await redisClient.get(`passwordReset:${normalizeEmail}`);
    if (!storedOtp) {
      res.status(400).json({ message: "OTP expired or invalid" });
      return;
    }
    if (storedOtp.toString() !== otp.toString()) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }
    const hashedPassword = await authRepository.hashPassword(newPassword);
    const updatedUser = await authRepository.resetPasswordByEmail(
      email,
      hashedPassword
    );

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await redisClient.del(`passwordReset:${normalizeEmail}`);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await authRepository.findUserById(userID);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateUserStatustoInActive = async (req, res) => {
  try {
    const { id: adminId, role } = req.user;

    if (!adminId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (role?.toLowerCase() !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can update user status" });
    }

    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User status updated to inactive successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserStatustoActive = async (req, res) => {
  try {
    const { id: adminId, role } = req.user;

    if (!adminId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (role?.toLowerCase() !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admin can update user status" });
    }

    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "active" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User status updated to active successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
