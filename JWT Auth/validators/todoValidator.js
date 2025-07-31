import Joi from "joi";

export const todoSchema = Joi.object({
  task: Joi.string().required(),
  category: Joi.string().required(),
});
