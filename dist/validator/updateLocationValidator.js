"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocationValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.updateLocationValidator = [
    (0, express_validator_1.check)('city')
        .optional()
        .isString()
        .withMessage('City must be a string')
        .isLength({ min: 2, max: 100 })
        .withMessage('City must be between 2 and 100 characters'),
    (0, express_validator_1.check)('suburb')
        .optional()
        .isString()
        .withMessage('Suburb must be a string')
        .isLength({ min: 2, max: 100 })
        .withMessage('Suburb must be between 2 and 100 characters'),
    (0, express_validator_1.check)('address')
        .optional()
        .isString()
        .withMessage('Address must be a string')
        .isLength({ min: 5, max: 255 })
        .withMessage('Address must be between 5 and 255 characters'),
    (0, express_validator_1.check)('coordinates')
        .optional()
        .isString()
        .withMessage('Coordinates must be a string')
        .matches(/^(https?:\/\/[^\s]+|[-+]?\d{1,2}\.\d+,\s*[-+]?\d{1,3}\.\d+)$/)
        .withMessage('Coordinates must be a valid URL or GPS format'),
    validator_middleware_1.default,
];
