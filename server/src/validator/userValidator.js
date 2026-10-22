import { body, validationResult } from "express-validator";

export const registerValidator = [
  body("email")
    .exists()
    .withMessage("email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email address"),
  body("name")
    .exists()
    .withMessage("email is required")
    .bail()
    .trim()
    .isString()
    .withMessage("String must be in string format")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("name must be between 2 to 50 characters"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .trim()
    .isString()
    .withMessage("Password must be in string format")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Pawword must have 6 characters or more"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: error.array(),
      });
    }

    next();
  },
];

export const loginValidator = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Enter a valid email")
    .bail()
    .isString()
    .withMessage("Email must be in string format"),
  body("password")
    .exists()
    .withMessage("password is required")
    .bail()
    .trim()
    .isString()
    .withMessage("password must be in string format")
    .bail()
    .isLength({ min: 6 })
    .withMessage("password must have 6 or more characters"),
  (req, res, next) => {
    const error = validationResult(res);

    if (!error.isEmpty()) {
      return res.status(400).json({
        message: "invalid data",
        errors: error.array(),
      });
    }

    next();
  },
];
