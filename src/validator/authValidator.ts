import { Request } from 'express';
import { check, Meta } from 'express-validator';
import { Auth } from '../models/Auth.model';
import validatorMiddleware from '../middleware/validator.middleware';
import HttpResponse from '../utils/HttpResponse';

export const signupValidator = [

  check('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom(async (val: string) => {
      const existingAuth = await Auth.findOne({ email: val });
      if (existingAuth) {
        throw HttpResponse.NotFound("Email is already take");
      }
    }),

    check('password')
    .notEmpty()
    .withMessage('Password required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .custom((password: string, { req }: Meta) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password confirmation incorrect');
      }
      return true;
    }),

  check('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirmation required'),

  validatorMiddleware,
];

export const loginValidator = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),

  check('password')
    .notEmpty()
    .withMessage('Password required'),

  validatorMiddleware,
];
