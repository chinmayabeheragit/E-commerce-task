const { body } = require("express-validator");

const registerValidation = [
  body("email")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role")
    .optional()
    .isIn(["admin", "customer"]).withMessage("Role must be admin or customer"),
];

const loginValidation = [
  body("email")
    .isEmail().withMessage("Invalid email format")
    .normalizeEmail(),
  body("password")
    .notEmpty().withMessage("Password is required"),
];

module.exports = { registerValidation, loginValidation };
