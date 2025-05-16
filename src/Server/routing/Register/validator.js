const { body, check } = require("express-validator");

const validateRegister = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("password")
    .exists()
    .withMessage("Password is required")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("username")
    .exists()
    .withMessage("Username is required")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3-20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers and underscores"),
  body("first_name")
    .exists()
    .withMessage("Name is required")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Name can only contain letters, spaces, hyphens and apostrophes"
    ),
  body("last_name")
    .exists()
    .withMessage("Surname is required")
    .notEmpty()
    .withMessage("Surname cannot be empty")
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage(
      "Surname can only contain letters, spaces, hyphens and apostrophes"
    ),
  body("phone")
    .optional({ checkFalsy: true })
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  check("src")
    .optional()
    .custom((value, { req }) => {
      if (!req.file) return true; // Skip if no file

      // Validate file type
      const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        throw new Error("Only JPEG, PNG or GIF images are allowed");
      }

      // Validate file size (2MB max)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (req.file.size > maxSize) {
        throw new Error("Profile picture must be less than 2MB");
      }

      return true;
    }),
];
module.exports = { validateRegister };
