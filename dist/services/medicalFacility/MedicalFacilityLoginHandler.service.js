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
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const subscription_model_1 = require("../../models/subscription.model");
const AccountLoaginBase_service_1 = __importDefault(require("../auth/AccountLoaginBase.service"));
class MedicalFacilityLoginHandler extends AccountLoaginBase_service_1.default {
    constructor() {
        super();
    }
    handle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const auth = yield this.login(body);
            if (auth.role != "medicalFacility") {
                throw HttpResponse_1.default.NotFound('Invalid email or password.');
            }
            console.log(auth);
            // Validate subscription
            const subscription = yield subscription_model_1.Subscription.findOne({
                auth: auth._id,
                status: 'Active',
                endDate: { $gt: new Date() },
            });
            if (!subscription) {
                throw HttpResponse_1.default.Forbidden('Your subscription has expired or is inactive.');
            }
            // Generate JWT token
            const token = yield this.tokenGeneration(auth._id);
            return { token, auth };
        });
    }
}
exports.default = MedicalFacilityLoginHandler;
