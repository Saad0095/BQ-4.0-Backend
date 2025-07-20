import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  images: [String],
});

const Product = model("Product", productSchema);

export default Product;
