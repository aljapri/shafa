"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.medialFacilityValidator = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
// Utility to check if a value is a valid MongoDB ObjectId
const isValidObjectId = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
// Validator for the provided object
exports.medialFacilityValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters'),
    (0, express_validator_1.check)('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isMobilePhone('any')
        .withMessage('Invalid phone number format'),
    (0, express_validator_1.check)('medicalFacilityType')
        .notEmpty()
        .withMessage('Medical Facility type is required')
        .isIn(['hospital', 'pharmacy', 'dispensary', 'Dentallaboratories', 'NursingClinic'])
        .withMessage('Medical Facility type must be either "hospital" or "clinic"'),
    (0, express_validator_1.check)('photo')
        .isString()
        .withMessage('Photo must be a string')
        .matches(/\.(jpg|jpeg|png)$/i)
        .withMessage('Photo must be a valid image file (jpg, jpeg, png, gif)'),
    (0, express_validator_1.check)('subscriptionPlanId')
        .notEmpty()
        .withMessage('Subscription Plan ID is required')
        .custom((val) => isValidObjectId(val))
        .withMessage('Invalid Subscription Plan ID'),
    (0, express_validator_1.check)('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string')
        .isLength({ min: 100 })
        .withMessage('Description must be at least 100 characters long'),
    validator_middleware_1.default,
];
