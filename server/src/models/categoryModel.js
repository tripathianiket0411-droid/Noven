import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    default: null,
  },
});

const categoryModel = mongoose.model("categories", categorySchema);

export default categoryModel;
