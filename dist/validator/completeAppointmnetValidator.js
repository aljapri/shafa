"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeAppointmentValidation = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.completeAppointmentValidation = [
    // Validate the appointmentId from the URL (Route Parameter)
    (0, express_validator_1.param)('appointmentId').isMongoId().withMessage('Invalid appointment ID'),
    // Validate the fields in the request body
    (0, express_validator_1.body)('diagnosis').notEmpty().withMessage('Diagnosis is required'),
    (0, express_validator_1.body)('medication').notEmpty().withMessage('Medication is required'),
    (0, express_validator_1.body)('notes').notEmpty().isString().withMessage('Notes must be a string'),
    validator_middleware_1.default
];
