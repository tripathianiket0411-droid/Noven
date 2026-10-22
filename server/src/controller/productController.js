import productModel from "../models/productModel.js";
import { uploadFile } from "../services/storageService.js";

export const createProduct = async (req, res) => {
  console.log("body",req.body);
  console.log("files",req.files);
  try {
    console.log("create product api hitted");
    const fileUrls = [];

    for (let i = 0; i < req.files.length; i++) {
      const response = await uploadFile({
        buffer: req.files[i].buffer,
        fileName: req.files[i].originalname,
      });



      fileUrls.push(response.url);
    }


    const product = await productModel.create({
      title: req.body.title,
      description: req.body.description,
      price: {
        amount: req.body.price.amount,
        currency: req.body.price.currency,
      },
      sizes: req.body.sizes,
      images: fileUrls,
      seller: req.user.userId,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    console.log("error in creating product", error);
  }
};


export const listAllProduct = async (req, res) => {
  const product = await productModel.find({published:true})

  res.status(200).json({
    message:"Product data fetched successfully",
    data:{
      product
    }
  })
}

export const listAllProductToSeller = async (req,res) => {
  const product = await productModel.find({})

  return res.status(200).json({
    message:"All Product Fetched Successfully",
    data:{
      product
    }
  })
}

export const unlistProduct = async (req,res) => {

  const {id} = req.params

  const product = await productModel.findById(id)

  if(!product){
    return res.status(400).json({
      message:"product not found",

    })
  }

  await productModel.findByIdAndUpdate(id, {published:false})

  return res.status(200).json({
    message:"product unlisted successfully"
  })

}

export const listProduct = async (req,res) => {
 try {
   const {id} = req.params;

  const product = await productModel.findById(id)
  if(!product){
    return res.status(400).json({
      message:"product not found"
    })
  }

  await productModel.findByIdAndUpdate(id, {published:true})

  return res.status(200).json({
    message:"product listed successfully"
  })
 } catch (error) {
  console.log("error in listiing api", error);
  
 }
}