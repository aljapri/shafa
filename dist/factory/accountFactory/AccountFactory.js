"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DoctorCreationHandler_service_1 = __importDefault(require("../../services/docotr/DoctorCreationHandler.service"));
const MedicalFacilityCreationHandler_service_1 = __importDefault(require("../../services/medicalFacility/MedicalFacilityCreationHandler.service"));
const PatientCreationHandler_service_1 = __importDefault(require("../../services/patient/PatientCreationHandler.service"));
class AccountFactory {
    constructor() { }
    static getInstance() {
        if (!AccountFactory.instance) {
            AccountFactory.instance = new AccountFactory();
        }
        return AccountFactory.instance;
    }
    CreateObject(type) {
        switch (type) {
            case "medicalFacility": return new MedicalFacilityCreationHandler_service_1.default();
            case "doctor": return new DoctorCreationHandler_service_1.default();
            case "patient": return new PatientCreationHandler_service_1.default();
        }
        return null;
    }
}
exports.default = AccountFactory;
