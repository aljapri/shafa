import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const updatePatientValidator = [
  // First Name Validation (Optional)
  check('firstName')
    .optional()
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),

  // Last Name Validation (Optional)
  check('lastName')
    .optional()
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),

  // Phone Number Validation (Optional)
  check('phone')
    .optional()
    .isString()
    .withMessage('Phone number must be a string'),

  // Optional Photo Validation
  check('photo')
    .optional()
    .custom((value, { req }) => {
      if (req.file) {
        const validFormats = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validFormats.includes(req.file.mimetype)) {
          throw new Error('Photo must be a JPEG, JPG, or PNG file');
        }
      }
      return true; // Skip validation if no file is provided
    }),

  validatorMiddleware,
];
