import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const patientValidator = [
  // First Name Validation
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  // Last Name Validation
  check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  // Phone Number Validation
  check('phone')
    .notEmpty()
    .withMessage('Phone number is required'),

  // Photo Validation (Handle via Multer for file uploads)
  // check('phone')
  //   .notEmpty()
  //   .withMessage('Phone number is required')
  //   .isMobilePhone('any')
  //   .withMessage('Invalid phone number format'),

  validatorMiddleware,
];
