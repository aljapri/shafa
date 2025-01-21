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
const PatientCreation_service_1 = __importDefault(require("./PatientCreation.service"));
const AccountCreationBase_service_1 = __importDefault(require("../auth/AccountCreationBase.service"));
class PatientCreationHandler extends AccountCreationBase_service_1.default {
    /**
     * Handle patient creation process
     */
    handle(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.withTransaction((session) => __awaiter(this, void 0, void 0, function* () {
                // Step 1: Create authentication record
                const body = req.body;
                const auth = yield this.createAuth(body.email, body.password, "patient", session);
                // Step 2: Create patient record with the uploaded photo (if exists)
                const patientData = {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    phone: body.phone,
                    photo: body.photo, // Add the photo path if available
                };
                const patient = yield new PatientCreation_service_1.default().create(patientData, auth._id, session);
                return patient;
            }));
        });
    }
}
exports.default = PatientCreationHandler;
