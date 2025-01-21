"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_model_1 = require("../../models/subscription.model");
const subscriptionPlan_model_1 = require("../../models/subscriptionPlan.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class SubscriptionCreationService {
    createSubscription(subscriptionPlanId, authId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionPlan = yield subscriptionPlan_model_1.SubscriptionPlan.findById(subscriptionPlanId);
            if (!subscriptionPlan) {
                throw HttpResponse_1.default.BadRequest("Invalid subscription plan ID.");
            }
            const startDate = new Date();
            const endDate = new Date();
            endDate.setMonth(endDate.getMonth() + subscriptionPlan.durationMonths);
            const subscription = yield subscription_model_1.Subscription.create([
                {
                    auth: authId, // Will update after medical facility creation
                    subscriptionPlan: subscriptionPlan._id,
                    startDate,
                    endDate,
                    status: "Active",
                },
            ], { session });
            return subscription[0];
        });
    }
}
exports.default = SubscriptionCreationService;
