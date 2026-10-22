import { body, validationResult } from "express-validator";

export const cartValidator = [
  body("productId")
    .exists()
    .withMessage("product id is required")
    .bail()
    .isString()
    .withMessage("product id must be in string")
    .bail()
    .isMongoId()
    .withMessage("product must have mongodb id"),
  body("quantity")
    .exists()
    .withMessage("quantity is required")
    .bail()
    .isInt()
    .withMessage("quantity should be a  intiger"),
  body("size")
    .exists()
    .withMessage("sizes are required")
    .bail()
    .isString()
    .withMessage("sizes must be a string")
    .bail()
    .isIn(["XS", "S", "M", "L", "XL", "XXL"])
    .withMessage("size must be one of XS, S, M, L, XL, XXL"),
    (req,res,next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                message:"invalid data",
                errors:errors.array()
            })
        }

        next()
    }
];
