"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const mongoose_1 = require("mongoose");
const subscriptionSchema = new mongoose_1.Schema({
    auth: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    subscriptionPlan: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SubscriptionPlan',
        required: true
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Inactive'],
        default: 'Active'
    },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
const Subscription = (0, mongoose_1.model)('Subscription', subscriptionSchema);
exports.Subscription = Subscription;
