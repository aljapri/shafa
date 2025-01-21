"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.patientValidator = [
    // First Name Validation
    (0, express_validator_1.check)('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isString()
        .withMessage('First name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('First name must be between 2 and 50 characters'),
    // Last Name Validation
    (0, express_validator_1.check)('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isString()
        .withMessage('Last name must be a string')
        .isLength({ min: 2, max: 50 })
        .withMessage('Last name must be between 2 and 50 characters'),
    // Phone Number Validation
    (0, express_validator_1.check)('phone')
        .notEmpty()
        .withMessage('Phone number is required'),
    (0, express_validator_1.check)("photo").notEmpty()
        .withMessage("photo is required"),
    // Photo Validation (Handle via Multer for file uploads)
    // check('phone')
    //   .notEmpty()
    //   .withMessage('Phone number is required')
    //   .isMobilePhone('any')
    //   .withMessage('Invalid phone number format'),
    validator_middleware_1.default,
];
