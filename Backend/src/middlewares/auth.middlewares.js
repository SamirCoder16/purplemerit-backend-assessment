import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";

export const authenticatedUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      req.cookies?.token || (authHeader && authHeader.split(" ")[1]);

    if (!token || token.trim() === "") {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({
      message:
        error.name === "TokenExpiredError"
          ? "Unauthorized: Token expired"
          : "Unauthorized: Invalid or malformed token",
    });
  }
};
