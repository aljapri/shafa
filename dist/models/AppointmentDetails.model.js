"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDetails = void 0;
const mongoose_1 = require("mongoose");
const appointmentDetailsSchema = new mongoose_1.Schema({
    appointment: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Appointment', required: true },
    diagnosis: { type: String, required: true },
    medication: { type: [String], required: true },
    notes: { type: String },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
const AppointmentDetails = (0, mongoose_1.model)('AppointmentDetails', appointmentDetailsSchema);
exports.AppointmentDetails = AppointmentDetails;
