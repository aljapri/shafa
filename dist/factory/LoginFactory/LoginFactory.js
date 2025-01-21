"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DoctorLoginHandler_service_1 = __importDefault(require("../../services/docotr/DoctorLoginHandler.service"));
const MedicalFacilityLoginHandler_service_1 = __importDefault(require("../../services/medicalFacility/MedicalFacilityLoginHandler.service"));
const PatientLoginHandler_service_1 = __importDefault(require("../../services/patient/PatientLoginHandler.service"));
class LoginFactory {
    constructor() { }
    static getInstance() {
        if (!LoginFactory.instance) {
            LoginFactory.instance = new LoginFactory();
        }
        return LoginFactory.instance;
    }
    CreateObject(type) {
        switch (type) {
            case "medicalFacility": return new MedicalFacilityLoginHandler_service_1.default();
            case "doctor": return new DoctorLoginHandler_service_1.default();
            case "patient": return new PatientLoginHandler_service_1.default();
        }
        return null;
    }
}
exports.default = LoginFactory;
