import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  total: Number,
  status: { type: String, default: "Pending", enum: ["Pending", "Processing", "Delivered"] },

  customer: {
    name: String,
    email: { type: String, required: true },
    address: String,
    contact: Number,
  },

  createdAt: { type: Date, default: Date.now() },
});

const Order = model("Order", orderSchema);
export default Order;
