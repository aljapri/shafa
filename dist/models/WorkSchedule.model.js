"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkSchedule = void 0;
const mongoose_1 = require("mongoose");
const workScheduleSchema = new mongoose_1.Schema({
    sunday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
    monday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
    tuesday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
    wednesday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
    thursday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
    friday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
    saturday: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        isAvailable: { type: Boolean, required: true, default: false },
    },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
const WorkSchedule = (0, mongoose_1.model)('WorkSchedule', workScheduleSchema);
exports.WorkSchedule = WorkSchedule;
