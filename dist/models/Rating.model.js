"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
const Rating = (0, mongoose_1.model)('Rating', ratingSchema);
exports.Rating = Rating;
