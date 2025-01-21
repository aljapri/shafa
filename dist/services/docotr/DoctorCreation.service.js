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
const Doctor_model_1 = require("../../models/Doctor.model");
class DoctorCreationService {
    /**
     * Create a doctor record
     */
    create(body, authId, workScheduleId, locationId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phone, photo, gender, specialization, maxPatients, description, experience } = body;
            const doctor = yield Doctor_model_1.Doctor.create([
                {
                    firstName,
                    lastName,
                    auth: authId,
                    phone,
                    photo,
                    gender,
                    specialization,
                    workSchedule: workScheduleId,
                    maxPatients,
                    description,
                    experience,
                    location: locationId,
                },
            ], { session });
            return doctor[0];
        });
    }
}
exports.default = DoctorCreationService;
