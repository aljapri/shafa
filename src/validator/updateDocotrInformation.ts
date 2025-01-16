import { check, body } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const updateDoctorValidator = [
  check('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 4, max: 50 })
    .withMessage('First name must be between 4 and 50 characters'),

  check('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 4, max: 50 })
    .withMessage('Last name must be between 4 and 50 characters'),

  check('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),

  check('photo')
    .optional()
    .isURL()
    .withMessage('Photo must be a valid URL'),

  check('specialization')
    .optional()
    .isString()
    .withMessage('Specialization must be a string'),

  check('maxPatients')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Maximum number of patients must be at least 1'),

  check('gender')
    .optional()
    .isIn(['male', 'female'])
    .withMessage('Gender must be one of male, female, or other'),

  check('description')
    .optional()
    .isString()
    .withMessage('About Me must be a string')
    .isLength({ min: 100 })
    .withMessage('description must be more than 100'),

  check('experience')
    .optional()
    .isNumeric()
    .withMessage('About Me must be a number')
    .isInt({ min: 1 })
    .withMessage('experience must be at least 1'),

  validatorMiddleware,
];
