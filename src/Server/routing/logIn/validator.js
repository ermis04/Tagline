const { body } = require("express-validator");

const validateLogIn = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("password").exists().notEmpty().withMessage("Password is required"),
];

module.exports = { validateLogIn };
