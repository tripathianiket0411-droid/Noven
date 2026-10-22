import { body, param, validationResult } from "express-validator";


export const createProductValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required").bail()
    .isString().withMessage("Title must be a string").bail()
    .isLength({ min: 2, max: 50 }).withMessage("Title must be 2 to 50 characters").bail()
    .matches(/^[a-zA-Z0-9\s\-&'.]+$/)
    .withMessage("Title contains invalid characters"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required").bail()
    .isString().withMessage("Description must be a string").bail()
    .isLength({ min: 20, max: 500 }).withMessage("Description must be 20 to 500 characters"),

body("images")
  .isArray({ min: 1, max: 5 })
  .withMessage("Product must have between 1 and 5 images"),
body("images.*")
  .isString().withMessage("Each image must be a string").bail()
  .trim()
  .isURL().withMessage("Each image must be a valid URL"),

  body("category")
    .notEmpty().withMessage("Category is required").bail()
    .isMongoId().withMessage("Category must be a valid id"),

  body("subcategory")
    .notEmpty().withMessage("Subcategory is required").bail()
    .isMongoId().withMessage("Subcategory must be a valid id"),

  body("type")
    .trim()
    .notEmpty().withMessage("Type is required").bail()
    .isString().withMessage("Type must be a string"),

  body("color")
    .trim()
    .notEmpty().withMessage("Color is required").bail()
    .isString().withMessage("Color must be a string"),

  body("price.amount")
    .notEmpty().withMessage("Amount is required").bail()
    .isFloat({ gt: 0 }).withMessage("Amount must be a number greater than 0"),

  body("price.currency")
    .optional()
    .isIn(["INR", "USD"]).withMessage("Currency must be INR or USD"),

  body("sizes")
    .isArray({ min: 1 }).withMessage("Sizes must be an array with at least 1 entry")
    .bail()
    .custom((sizes) => {
      const names = sizes.map((s) => s.size);
      if (new Set(names).size !== names.length) {
        throw new Error("Duplicate sizes are not allowed");
      }
      return true;
    }),

  body("sizes.*.size")
    .trim()
    .notEmpty().withMessage("Size is required in every entry").bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("Size must be one of XS, S, M, L, XL, XXL"),

  body("sizes.*.stock")
    .notEmpty().withMessage("Stock is required in every entry").bail()
    .isInt({ min: 0 }).withMessage("Stock must be an integer 0 or more"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid request",
        errors: errors.array(),
      });
    }
    next();
  },
];


export const unlistProductValidator = [
  param ("id")
  .exists().withMessage("Product is required  ").bail()
  .isMongoId().withMessage("Product must be a valid mongoId"),
  (req,res,next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      return res.status(400).json({
        message:"Invalid Data",
        errors:errors.array()
      })
    }

    next()
  }
]

export const listProductValidator = [
  param("id")
  .exists().withMessage("Id is required").bail()
  .isMongoId().withMessage("product must have a valid mongodb id "),
  (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({
        message:"Invalid data",
        errors:errors.array()
      })
    }


    next()
  }
]