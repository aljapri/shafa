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
const AppointmentDetails_model_1 = require("../../models/AppointmentDetails.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class AppointmentCompleting {
    constructor(appointmentId, doctorId, diagnosis, medication, notes) {
        this.appointmentId = appointmentId;
        this.doctorId = doctorId;
        this.diagnosis = diagnosis;
        this.medication = medication;
        this.notes = notes;
    }
    /**
     * Mark an appointment as completed by the doctor and add details
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate ObjectIds
            // Start a transaction
            const session = yield Appointment_model_1.Appointment.startSession();
            try {
                // Start the transaction explicitly
                session.startTransaction();
                // Log the appointmentId and doctorId to check their values
                // Find the appointment by ID and verify that it belongs to the doctor
                const appointment = yield Appointment_model_1.Appointment.findOne({
                    _id: this.appointmentId,
                    doctor: this.doctorId,
                    status: 'booked',
                }).session(session); // Ensure to run this query in the session
                // Log the result of the query
                if (!appointment) {
                    throw HttpResponse_1.default.NotFound('Appointment not found or not accessible.');
                }
                // Update the appointment status to 'completed'
                appointment.status = 'completed';
                yield appointment.save({ session }); // Ensure to save within the transaction
                // Create the appointment details
                const appointmentDetails = yield AppointmentDetails_model_1.AppointmentDetails.create([{
                        appointment: this.appointmentId,
                        diagnosis: this.diagnosis,
                        medication: this.medication,
                        notes: this.notes,
                    }], { session }); // Ensure to create appointment details within the transaction
                // Commit the transaction
                yield session.commitTransaction();
                return HttpResponse_1.default.Ok({
                    appointment,
                    appointmentDetails,
                });
            }
            catch (error) {
                // Rollback the transaction in case of an error
                yield session.abortTransaction();
                throw error;
            }
            finally {
                // End the session
                session.endSession();
            }
        });
    }
}
exports.default = AppointmentCompleting;
