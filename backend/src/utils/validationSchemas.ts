import Joi from "joi";

export const userRegisterSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    ) // At least 1 uppercase, 1 lowercase, 1 digit, 1 special character
    .required(),
  ipAddress: Joi.string().ip().required(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$")
    ) // At least 1 uppercase, 1 lowercase, 1 digit, 1 special character
    .required(),
});

export const guestDataSchema = Joi.object({
  ipAddress: Joi.string().ip().required(),
  timeRemaining: Joi.number().required(),
  filterAttemptsRemaining: Joi.number().required(),
});

export const userPasswordRecoverSchema = Joi.string().email().required();

export const getGuestSchema = Joi.string().ip().required();
