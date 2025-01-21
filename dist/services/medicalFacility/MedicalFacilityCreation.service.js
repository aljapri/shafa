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
Object.defineProperty(exports, "__esModule", { value: true });
const medicalFacility_model_1 = require("../../models/medicalFacility.model");
class MedicalFacilityService {
    createMedicalFacility(body, authId, locationId, workScheduleId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, phone, medicalFacilityType, photo, description } = body;
            const medicalFacility = yield medicalFacility_model_1.MedicalFacility.create([
                {
                    name,
                    phone,
                    photo,
                    location: locationId,
                    medicalFacilityType,
                    workSchedule: workScheduleId,
                    auth: authId,
                    description,
                    isActive: true,
                },
            ], { session });
            // Update subscription with the created medical facility ID
            return medicalFacility[0];
        });
    }
}
exports.default = MedicalFacilityService;
