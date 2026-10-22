import express from "express";
import userRoutes from "../routes/userRoutes.js";
import cookieParser from 'cookie-parser'
import productRoutes from '../routes/productRoutes.js'
import cartRoutes from '../routes/cartRoutes.js'

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use("/user/auth", userRoutes);
app.use("/user/product", productRoutes)
app.use("/user/cart", cartRoutes)


export default app;
