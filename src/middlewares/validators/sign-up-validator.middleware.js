import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { MIN_PASSWORD_LENGTH } from '../../constants/auth.constant.js';

const schema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
    'string.email': MESSAGES.AUTH.COMMON.EMAIL.INVALID_FORMAT,
  }),
  password: Joi.string()
    .required()
    .min(MIN_PASSWORD_LENGTH)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).*$/)
    .messages({
      'any.required': MESSAGES.AUTH.COMMON.PASSWORD.REQURIED,
      'string.min': MESSAGES.AUTH.COMMON.PASSWORD.MIN_LENGTH,
      'string.pattern.base': MESSAGES.AUTH.COMMON.PASSWORD.PATTERN,
    }),
  passwordConfirm: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.required': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.REQURIED,
    'any.only': MESSAGES.AUTH.COMMON.PASSWORD_CONFIRM.NOT_MACHTED_WITH_PASSWORD,
  }),
  name: Joi.string().required().messages({
    'any.required': MESSAGES.AUTH.COMMON.NAME.REQURIED,
  }),
  interest: Joi.string().optional().messages({
    'string.base': MESSAGES.AUTH.COMMON.INTEREST.INVALID_FORMAT,
  }),
  phoneNumber: Joi.string()
    .optional()
    .pattern(/^010-\d{4}-\d{4}$/)
    .messages({
      'string.pattern.base': MESSAGES.AUTH.COMMON.PHONE_NUMBER.FAILED,
    }),
  catchBox: Joi.string().optional(),
}).unknown(true);

export const signUpValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
