import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().required(),
    brand: Joi.string().optional(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(5).required(),
    inStock: Joi.boolean().optional(),
    images: Joi.array().items(Joi.string().uri()).required(),
})

