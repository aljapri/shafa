"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    doctor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patient: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Patient', required: true },
    comment: { type: String, required: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
const Comment = (0, mongoose_1.model)('Comment', commentSchema);
exports.Comment = Comment;
