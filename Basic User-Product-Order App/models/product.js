import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: String,
  category: {
    type: String,
    enum: ["sports goods", "books", "stationary", "toys"],
  },
  price: Number,
  quantity: Number,
  images: [String],
});

const Product = model("Product", productSchema);

export default Product;
