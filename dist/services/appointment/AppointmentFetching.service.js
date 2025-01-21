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
const Appointment_model_1 = require("../../models/Appointment.model");
class AppointmentFetching {
    fetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentId = req.params.appointmentId;
            const queryConditions = { _id: appointmentId };
            if (req.role == "doctor") {
                queryConditions.doctor = req.accountId;
            }
            else if (req.role == "patient") {
                queryConditions.patient = req.accountId;
            }
            else {
                throw new Error('Invalid owner type. Specify if the ID belongs to a patient or a doctor.');
            }
            // Base query to filter by medicalFacilityId
            let doctor = yield Appointment_model_1.Appointment.findOne(queryConditions)
                .populate('patient', 'firstName lastName') // Populate patient fields
                .populate('doctor', 'firstName lastName specialization'); // Populate doctor fields;
            return doctor;
        });
    }
}
exports.default = AppointmentFetching;
