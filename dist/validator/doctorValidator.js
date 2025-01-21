"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorValidator = void 0;
const express_validator_1 = require("express-validator");
exports.doctorValidator = [
    (0, express_validator_1.check)('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isString()
        .withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    (0, express_validator_1.check)('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isString()
        .withMessage('Last name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    (0, express_validator_1.check)('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone('any')
        .withMessage('Invalid phone number format'),
    (0, express_validator_1.check)('photo')
        .notEmpty()
        .withMessage('Photo is required')
        .isURL()
        .withMessage('Photo must be a valid URL'),
    (0, express_validator_1.check)('specialization')
        .notEmpty()
        .withMessage('Specialization is required')
        .isString()
        .withMessage('Specialization must be a string'),
    (0, express_validator_1.check)('maxPatients')
        .notEmpty()
        .withMessage('Maximum number of patients is required')
        .isInt({ min: 1 })
        .withMessage('Maximum number of patients must be at least 1'),
    (0, express_validator_1.check)('gender')
        .notEmpty()
        .withMessage('Gender is required')
        .isIn(['male', 'female', 'other'])
        .withMessage('Gender must be one of male, female, or other'),
    (0, express_validator_1.check)('description')
        .notEmpty()
        .withMessage('About Me is required')
        .isString()
        .withMessage('About Me must be a string')
        .isLength({ min: 100 })
        .withMessage('About Me must be more than 100'),
    (0, express_validator_1.check)('experience')
        .notEmpty()
        .withMessage('experience is required')
        .isInt({ min: 1 })
        .withMessage('experience must be at least 1'),
];
