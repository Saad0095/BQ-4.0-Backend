import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["Sports goods", "Books", "Stationary", "Toys"],
      required: true,
      trim: true,
    },
    brand: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    inStock: { type: Boolean, default: true },
    images: { type: [String], required: true },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
