import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

export const addToCart = async (req, res) => {
  console.log("cart hitted");

  try {
    let { productId, quantity, size } = req.body;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "product not found ",
      });
    }

    const selectedSize = product.sizes.find((s) => s.size === size);

    if (!selectedSize) {
      return res.status(400).json({
        message: "Invalid sizes",
      });
    }

    if (selectedSize.stock < quantity) {
      return res.status(400).json({
        message: "insufficient product",
      });
    }

    const cart =
      (await cartModel.findOne({ user: req.user.userId })) ??
      (await cartModel.create({ user: req.user.userId }));

    const productInCart = cart.products.find(
      (p) => p.product.toString() === productId && p.size === size,
    );

    if (productInCart) {
      if (productInCart.quantity + quantity > selectedSize.stock) {
        return res.status(400).json({
          message: "insufficient stock",
        });
      }

      await cartModel.updateOne(
        {
          user: req.user.userId,
          "products.product": productId,
          "products.size": size,
        },
        {
          $inc: {
            "product.$.quantity": quantity,
          },
        },
      );

      return res.status(200).json({
        message: "products qunatity updated in cart",
      });
    }

    await cartModel.findOneAndUpdate(
      { user: req.user.userId },
      {
        $push: {
          products: {
            product: productId,
            quantity: quantity,
            size: size,
          },
        },
      },
    );

    return res.status(200).json({
      message: "product added to cart",
    });
  } catch (error) {
    console.log("error in login api", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export async function getCart(req, res) {
  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));


    return res.status(200).json({
        message:"cart retrived successfully",
        data:{
            cart:cart
        }
    })
}
