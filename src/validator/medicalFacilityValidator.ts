import { check, body } from 'express-validator';
import mongoose from 'mongoose';
import validatorMiddleware from '../middleware/validator.middleware';

// Utility to check if a value is a valid MongoDB ObjectId
const isValidObjectId = (id: string): boolean => mongoose.Types.ObjectId.isValid(id);

// Validator for the provided object
export const medialFacilityValidator = [
  check('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),

  check('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any')
    .withMessage('Invalid phone number format'),

  check('medicalFacilityType')
    .notEmpty()
    .withMessage('Medical Facility type is required')
    .isIn(['hospital', 'pharmacy', 'dispensary', 'Dentallaboratories', 'NursingClinic'])
    .withMessage('Medical Facility type must be either "hospital" or "clinic"'),

  check('photo')
    .isString()
    .withMessage('Photo must be a string')
    .matches(/\.(jpg|jpeg|png)$/i)
    .withMessage('Photo must be a valid image file (jpg, jpeg, png, gif)'),

  check('subscriptionPlanId')
    .notEmpty()
    .withMessage('Subscription Plan ID is required')
    .custom((val) => isValidObjectId(val))
    .withMessage('Invalid Subscription Plan ID'),
    
  check('description')
    .notEmpty()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description must be a string')
    .isLength({ min: 100 })
    .withMessage('Description must be at least 100 characters long'),


  validatorMiddleware,
];
