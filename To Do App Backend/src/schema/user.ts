import Joi from "joi";

const createUserSchema = Joi.object({
  fullname: Joi.string().required().max(255).messages({
    "required.any": "Fullname is required",
  }),

  email: Joi.string().email().required().max(255).messages({
    "required.any": "Fullname is required",
  }),

  password: Joi.string().required().max(255).messages({
    "required.any": "Fullname is required",
  }),
});

const updateUserSchema = Joi.object({
  fullname: Joi.string().required().max(255).messages({
    "required.any": "Fullname is required",
  }),
});

export { createUserSchema, updateUserSchema };
