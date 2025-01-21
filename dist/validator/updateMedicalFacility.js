"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedicalFacilityValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.updateMedicalFacilityValidator = [
    (0, express_validator_1.check)('name')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3 and 50 characters'),
    (0, express_validator_1.check)('phone')
        .optional()
        .isMobilePhone('any')
        .withMessage('Invalid phone number format'),
    (0, express_validator_1.check)('photo')
        .optional()
        .isString()
        .withMessage('Photo must be a string')
        .matches(/\.(jpg|jpeg|png)$/i)
        .withMessage('Photo must be a valid image file (jpg, jpeg, png, gif)'),
    (0, express_validator_1.check)('description')
        .optional()
        .isString()
        .withMessage('Description must be a string')
        .isLength({ min: 100 })
        .withMessage('Description must be at least 100 characters long'),
    validator_middleware_1.default,
];
