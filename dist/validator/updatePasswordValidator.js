"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.updatePasswordValidator = [
    (0, express_validator_1.check)('currentPassword')
        .notEmpty()
        .withMessage('Current password is required')
        .isLength({ min: 8 })
        .withMessage('Current password must be at least 8 characters long'),
    (0, express_validator_1.check)('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 8 })
        .withMessage('New password must be at least 8 characters long')
        .custom((newPassword, { req }) => {
        if (newPassword === req.body.currentPassword) {
            throw new Error('New password must be different from the current password');
        }
        return true;
    }),
    validator_middleware_1.default,
];
