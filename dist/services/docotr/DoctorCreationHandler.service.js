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
const AccountCreationBase_service_1 = __importDefault(require("../auth/AccountCreationBase.service"));
const WorkSchedulCreation_service_1 = __importDefault(require("../workSchedule/WorkSchedulCreation.service"));
const DoctorCreation_service_1 = __importDefault(require("./DoctorCreation.service"));
const LocationCreation_service_1 = __importDefault(require("../location/LocationCreation.service"));
const Subscription_service_1 = __importDefault(require("../subscription/Subscription.service"));
class DoctorCreationHandler extends AccountCreationBase_service_1.default {
    constructor() {
        super();
        this.workScheduleService = new WorkSchedulCreation_service_1.default();
        this._locationService = new LocationCreation_service_1.default();
        this._subscriptionService = new Subscription_service_1.default();
    }
    /**
     * Handle doctor creation process
     */
    handle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withTransaction((session) => __awaiter(this, void 0, void 0, function* () {
                const body = req.body;
                const medicalFacilityId = req.accountId;
                // Step 1: Create authentication record
                const auth = yield this.createAuth(body.email, body.password, "doctor", session);
                const location = yield this._locationService.createLocation(body.location, session);
                // Step 2: Create work schedule
                const workSchedule = yield this.workScheduleService.create(body.workSchedule, session);
                // Step 3: Create doctor record
                const doctor = yield new DoctorCreation_service_1.default().create(body, auth._id, workSchedule._id, location._id, session);
                const subscription = yield this._subscriptionService.createSubscription(body.subscriptionPlanId, auth._id, session);
                return doctor;
            }));
        });
    }
}
exports.default = DoctorCreationHandler;
