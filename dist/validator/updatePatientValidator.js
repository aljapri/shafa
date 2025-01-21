"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePatientValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.updatePatientValidator = [
    // First Name Validation (Optional)
    (0, express_validator_1.check)('firstName')
        .optional()
        .isString()
        .withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    // Last Name Validation (Optional)
    (0, express_validator_1.check)('lastName')
        .optional()
        .isString()
        .withMessage('Last name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    // Phone Number Validation (Optional)
    (0, express_validator_1.check)('phone')
        .optional()
        .isString()
        .withMessage('Phone number must be a string'),
    // Optional Photo Validation
    (0, express_validator_1.check)('photo')
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
    validator_middleware_1.default,
];
