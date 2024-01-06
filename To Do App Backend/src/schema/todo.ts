import Joi from "joi";

const getTaskSchema = Joi.object({
  title: Joi.string().required().min(3).max(255).messages({
    "required.any": "Title is required",
  }),

  completed: Joi.boolean()
  });

export { getTaskSchema };
