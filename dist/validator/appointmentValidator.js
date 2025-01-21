"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppointmentValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.createAppointmentValidator = [
    (0, express_validator_1.check)('doctorId')
        .notEmpty()
        .withMessage('Doctor ID is required')
        .isMongoId()
        .withMessage('Doctor ID must be a valid MongoDB ObjectId'),
    (0, express_validator_1.check)('date')
        .notEmpty()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Date must be in valid ISO 8601 format')
        .custom((value) => {
        const currentDate = new Date();
        const appointmentDate = new Date(value);
        // If the appointment date is before today, throw an error
        if (appointmentDate < currentDate) {
            throw new Error('Appointment date must be today or in the future');
        }
        return true;
    }),
    (0, express_validator_1.check)('time')
        .notEmpty()
        .withMessage('Time is required')
        .matches(/^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/)
        .withMessage('Time must be in HH:mm AM/PM format'),
    validator_middleware_1.default,
];
