"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const mongoose_1 = require("mongoose");
const appointmentSchema = new mongoose_1.Schema({
    patient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ['booked', 'canceled', 'completed', 'expired'], required: true, default: "booked" },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
const Appointment = (0, mongoose_1.model)('Appointment', appointmentSchema);
exports.Appointment = Appointment;
