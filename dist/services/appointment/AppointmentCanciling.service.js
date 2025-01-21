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
class AppointmentCanciling {
    /**
     * Constructor to receive parameters
     * @param appointmentId - The ID of the appointment to be canceled
     * @param id - The ID of the patient or doctor making the request
     * @param role - The role (patient or doctor) making the request
     */
    constructor(appointmentId, id, role) {
        this.appointmentId = appointmentId;
        this.id = id;
        this.role = role;
    }
    /**
     * Handles appointment cancellation by a patient or doctor.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let appointment;
            if (this.role === "patient") {
                appointment = yield Appointment_model_1.Appointment.findOne({
                    _id: this.appointmentId,
                    patient: this.id,
                    status: 'booked',
                });
            }
            else if (this.role === "doctor") {
                appointment = yield Appointment_model_1.Appointment.findOne({
                    _id: this.appointmentId,
                    doctor: this.id,
                    status: 'booked',
                });
            }
            if (!appointment) {
                throw HttpResponse_1.default.NotFound("Appointment not found or you don't have permission to cancel it.");
            }
            // Update the status to "canceled"
            appointment.status = 'canceled';
            yield appointment.save();
            return HttpResponse_1.default.Ok(appointment);
        });
    }
}
exports.default = AppointmentCanciling;
