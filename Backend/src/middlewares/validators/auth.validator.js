import { body, param } from "express-validator";

export const registerUserValidator = [
  body("userName").notEmpty().withMessage("User name is required"),
  body("email").isEmail().withMessage("Please provide a valid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
];

export const loginUserValidator = [
  body("email")
    .notEmpty()
    .withMessage("email should not be empty")
    .isEmail()
    .withMessage("Invalid Email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password must be atleast 6 characters long"),
];

export const updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("userName").notEmpty().withMessage("User name is required"),
];
