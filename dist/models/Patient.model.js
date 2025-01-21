"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, default: 'patient.jpg' }, // Default photo
    auth: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Auth', required: true }, // Reference to Auth model
}, { timestamps: true });
const Patient = (0, mongoose_1.model)('Patient', patientSchema);
exports.Patient = Patient;
