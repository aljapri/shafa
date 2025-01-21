"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const mongoose_1 = require("mongoose");
// Define the schema for the Doctor model
const doctorSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    auth: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Auth', required: true }, // Reference to Auth model
    phone: { type: String, required: true },
    photo: { type: String, required: true },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    specialization: { type: String, required: true },
    location: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Location', required: true },
    workSchedule: { type: mongoose_1.Schema.Types.ObjectId, ref: 'WorkSchedule' },
    maxPatients: { type: Number, required: true },
    description: { type: String, required: true },
    experience: { type: Number, required: true },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
// Create the Doctor model
const Doctor = (0, mongoose_1.model)('Doctor', doctorSchema);
exports.Doctor = Doctor;
