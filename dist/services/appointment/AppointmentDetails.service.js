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
const Appointment_model_1 = require("../../models/Appointment.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const AppointmentDetails_model_1 = require("../../models/AppointmentDetails.model");
class AppointmentDetailsFetching {
    fetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentId = req.params.appointmentId;
            const queryConditions = { _id: appointmentId, status: "completed" };
            if (req.role == "doctor") {
                queryConditions.doctor = req.accountId;
            }
            else if (req.role == "patient") {
                queryConditions.patient = req.accountId;
            }
            else {
                throw HttpResponse_1.default.Forbidden('Invalid owner type. Specify if the ID belongs to a patient or a doctor.');
            }
            // console.log(queryConditions);
            // Base query to filter by medicalFacilityId
            let appointment = yield Appointment_model_1.Appointment.findOne(queryConditions);
            if (!appointment) {
                throw HttpResponse_1.default.NotFound("there are no appointmnet");
            }
            const appointmentDetails = yield AppointmentDetails_model_1.AppointmentDetails.findOne({ appointment: appointment._id }).populate("appointment");
            if (!appointmentDetails) {
                throw HttpResponse_1.default.NotFound("there are no appointmnet Deails");
            }
            return appointmentDetails;
        });
    }
}
exports.default = AppointmentDetailsFetching;
