"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkScheduleValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.updateWorkScheduleValidator = [
    (0, express_validator_1.check)('workSchedule')
        .optional()
        .isObject()
        .withMessage('Work Schedule must be an object'),
    (0, express_validator_1.body)('workSchedule.*.startTime')
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Start time must be in HH:mm format'),
    (0, express_validator_1.body)('workSchedule.*.endTime')
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('End time must be in HH:mm format'),
    (0, express_validator_1.body)('workSchedule.*.isAvailable')
        .optional()
        .isBoolean()
        .withMessage('Availability must be a boolean'),
    validator_middleware_1.default,
];
