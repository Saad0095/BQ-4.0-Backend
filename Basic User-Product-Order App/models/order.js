import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Processing", "Delivered"],
      required: true,
    },

    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      contact: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);
export default Order;
