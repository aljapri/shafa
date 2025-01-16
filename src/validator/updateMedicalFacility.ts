import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const updateMedicalFacilityValidator = [
  check('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  check('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),

  check('photo')
    .optional()
    .isString()
    .withMessage('Photo must be a string')
    .matches(/\.(jpg|jpeg|png)$/i)
    .withMessage('Photo must be a valid image file (jpg, jpeg, png, gif)'),

  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 100 })
    .withMessage('Description must be at least 100 characters long'),

  validatorMiddleware,
];
