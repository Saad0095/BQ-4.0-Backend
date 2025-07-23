import Joi from "joi";
import mongoose from "mongoose";

export const orderSchema = Joi.object({
  products: Joi.array().items(
    Joi.object({
      productId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message("Invalid Product Id");
          }
          return value;
        }),
      quantity: Joi.number().min(1).required(),
    })
  ),
  status: Joi.string().valid("Pending", "Processing", "Delivered").required(),

  customer: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    contact: Joi.string().required(),
  }).required(),
});

export const orderUpdateSchema = Joi.object({
  status: Joi.string().valid("Pending", "Processing", "Delivered").required(),
});
