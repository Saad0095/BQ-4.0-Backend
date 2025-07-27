import Joi from "joi";

export const todoSchema = Joi.object({
  userId: Joi.string().required(),
  task: Joi.string().required(),
  category: Joi.string().required(),
});
