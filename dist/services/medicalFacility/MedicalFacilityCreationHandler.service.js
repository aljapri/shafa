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
const MedicalFacilityCreation_service_1 = __importDefault(require("./MedicalFacilityCreation.service"));
const LocationCreation_service_1 = __importDefault(require("../location/LocationCreation.service"));
const Subscription_service_1 = __importDefault(require("../subscription/Subscription.service"));
const WorkSchedulCreation_service_1 = __importDefault(require("../workSchedule/WorkSchedulCreation.service"));
class MedicalFacilityCreationHandler extends AccountCreationBase_service_1.default {
    constructor() {
        super();
        this._workScheduleService = new WorkSchedulCreation_service_1.default();
        this._locationService = new LocationCreation_service_1.default();
        this._subscriptionService = new Subscription_service_1.default();
        this._medicalFacilityService = new MedicalFacilityCreation_service_1.default();
    }
    handle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withTransaction((session) => __awaiter(this, void 0, void 0, function* () {
                const body = req.body;
                // Step 1: Create authentication
                const auth = yield this.createAuth(body.email, body.password, "medicalFacility", session);
                // Step 2: Create location
                const location = yield this._locationService.createLocation(body.location, session);
                const workSchedule = yield this._workScheduleService.create(body.workSchedule, session);
                const medicalFacility = yield this._medicalFacilityService.createMedicalFacility(body, auth._id, location._id, workSchedule._id, session);
                // Step 3: Create subscription
                const subscription = yield this._subscriptionService.createSubscription(body.subscriptionPlanId, auth._id, session);
                // Step 4: Create medical facility
                return medicalFacility;
            }));
        });
    }
}
exports.default = MedicalFacilityCreationHandler;
