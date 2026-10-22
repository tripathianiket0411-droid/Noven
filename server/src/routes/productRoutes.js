import Router, { json } from "express";
import multer from "multer";
import { authenticate, authenticateSeller } from "../middlewear/authMiddlewear.js";
import { createProductValidator, listProductValidator, unlistProductVAlidator } from "../validator/productValidator.js";
import { createProduct, listAllProduct, listAllProductToSeller, listProduct, unlistProduct } from "../controller/productController.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024,
  },
});

const router = Router();

router.post(
  "/",
  authenticate,
  authenticateSeller,
  upload.array("images"),
  (req, res, next) => {
    req.body.price = JSON.parse(req.body.price);
    req.body.sizes = JSON.parse(req.body.sizes);

    next();
  },
  createProductValidator,
  createProduct

);


router.get("/", authenticate,listAllProduct)

router.get("/seller", authenticate, authenticateSeller, listAllProductToSeller)

router.patch("/unlist/:id", authenticate, authenticateSeller,unlistProductVAlidator,unlistProduct)

router.patch("/list/:id", authenticate, authenticateSeller, listProductValidator, listProduct)

export default router;
