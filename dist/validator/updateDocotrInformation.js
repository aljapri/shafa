"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDoctorValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.updateDoctorValidator = [
    (0, express_validator_1.check)('firstName')
        .optional()
        .isString()
        .withMessage('First name must be a string')
        .isLength({ min: 4, max: 50 })
        .withMessage('First name must be between 4 and 50 characters'),
    (0, express_validator_1.check)('lastName')
        .optional()
        .isString()
        .withMessage('Last name must be a string')
        .isLength({ min: 4, max: 50 })
        .withMessage('Last name must be between 4 and 50 characters'),
    (0, express_validator_1.check)('phone')
        .optional()
        .isMobilePhone('any')
        .withMessage('Invalid phone number format'),
    (0, express_validator_1.check)('photo')
        .optional()
        .isURL()
        .withMessage('Photo must be a valid URL'),
    (0, express_validator_1.check)('specialization')
        .optional()
        .isString()
        .withMessage('Specialization must be a string'),
    (0, express_validator_1.check)('maxPatients')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Maximum number of patients must be at least 1'),
    (0, express_validator_1.check)('gender')
        .optional()
        .isIn(['male', 'female'])
        .withMessage('Gender must be one of male, female, or other'),
    (0, express_validator_1.check)('description')
        .optional()
        .isString()
        .withMessage('About Me must be a string')
        .isLength({ min: 100 })
        .withMessage('description must be more than 100'),
    (0, express_validator_1.check)('experience')
        .optional()
        .isNumeric()
        .withMessage('About Me must be a number')
        .isInt({ min: 1 })
        .withMessage('experience must be at least 1'),
    validator_middleware_1.default,
];
