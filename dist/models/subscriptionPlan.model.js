"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionPlan = void 0;
const mongoose_1 = require("mongoose");
const subscriptionPlanSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    durationMonths: { type: Number, required: true }, // e.g., 12 for a year, 1 for a month
    price: { type: Number, required: true },
}, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
});
const SubscriptionPlan = (0, mongoose_1.model)('SubscriptionPlan', subscriptionPlanSchema);
exports.SubscriptionPlan = SubscriptionPlan;
