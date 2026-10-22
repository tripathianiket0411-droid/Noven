import Router from 'express'
import { authenticate } from '../middlewear/authMiddlewear.js';
import { cartValidator } from '../validator/cartValidator.js';
import { addToCart, getCart } from '../controller/cartController.js';

const router = Router()

router.post("/cart", authenticate, cartValidator, addToCart)
router.get("/cart", authenticate,getCart)


export default router;