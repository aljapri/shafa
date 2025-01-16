import { check, body } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const doctorValidator = [
  check('firstName')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  check('lastName')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),


  check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),

  check('photo')
    .notEmpty()
    .withMessage('Photo is required')
    .isURL()
    .withMessage('Photo must be a valid URL'),

  check('specialization')
    .notEmpty()
    .withMessage('Specialization is required')
    .isString()
    .withMessage('Specialization must be a string'),

  check('maxPatients')
    .notEmpty()
    .withMessage('Maximum number of patients is required')
    .isInt({ min: 1 })
    .withMessage('Maximum number of patients must be at least 1'),

  check('gender')
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be one of male, female, or other'),

  check('description')
    .notEmpty()
    .withMessage('About Me is required')
    .isString()
    .withMessage('About Me must be a string')
    .isLength({ min: 100})
    .withMessage('About Me must be more than 100'),
  check('experience')
    .notEmpty()
    .withMessage('experience is required')
    .isInt({ min: 1 })
    .withMessage('experience must be at least 1'),


];
