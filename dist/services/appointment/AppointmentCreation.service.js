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
const Patient_model_1 = require("../../models/Patient.model");
const Doctor_model_1 = require("../../models/Doctor.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class AppointmentCreation {
    /**
     * Constructor for initializing AppointmentService with necessary parameters.
     * @param doctorId - The ID of the doctor
     * @param patientId - The ID of the patient
     * @param date - The date of the appointment
     * @param time - The time of the appointment
     */
    constructor(doctorId, patientId, date, time) {
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.date = date;
        this.time = time;
    }
    /**
     * Creates an appointment after validation.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate patient
            const patient = yield Patient_model_1.Patient.findById(this.patientId);
            if (!patient) {
                throw HttpResponse_1.default.NotFound('Patient not found.');
            }
            // Validate doctor and medical facility
            const doctor = yield Doctor_model_1.Doctor.findOne({ _id: this.doctorId }).populate({
                path: 'workSchedule',
            });
            if (!doctor) {
                throw HttpResponse_1.default.NotFound('Doctor not found.');
            }
            const inputDate = new Date(this.date); // This represents the date (January 13, 2025)
            // Get the day of the week from the date
            const dayOfWeek = inputDate.toLocaleString('en-us', { weekday: 'long' }).toLocaleLowerCase();
            // Check if the doctor has  availability for this day
            const workDay = doctor.workSchedule[dayOfWeek];
            if (!workDay || !workDay.isAvailable) {
                throw HttpResponse_1.default.Conflict('Doctor is not available on this day.');
            }
            // Check if the appointment time is within the doctor's working hours for that day
            const appointmentTime = this.time.split(' ')[0]; // Extract time from "HH:mm AM/PM"
            const [appointmentHour, appointmentMinute] = appointmentTime.split(':').map(Number);
            const [startHour, startMinute] = workDay.startTime.split(':').map(Number);
            const [endHour, endMinute] = workDay.endTime.split(':').map(Number);
            const startOfDay = new Date(this.date);
            startOfDay.setHours(startHour, startMinute, 0, 0);
            const endOfDay = new Date(this.date);
            endOfDay.setHours(endHour, endMinute, 0, 0);
            const appointmentDate = new Date(this.date);
            appointmentDate.setHours(appointmentHour, appointmentMinute, 0, 0);
            console.log(endHour);
            if (appointmentDate < startOfDay || appointmentDate > endOfDay) {
                throw HttpResponse_1.default.Conflict('The selected time is outside the doctor\'s working hours.');
            }
            // Check for conflicting appointments
            const conflict = yield Appointment_model_1.Appointment.findOne({
                doctor: this.doctorId,
                date: this.date,
                time: this.time,
                status: 'booked',
            });
            if (conflict) {
                throw HttpResponse_1.default.Conflict('The doctor is already booked for the selected time.');
            }
            // Create the appointment
            const appointment = yield Appointment_model_1.Appointment.create({
                patient: this.patientId,
                doctor: this.doctorId,
                date: this.date,
                time: this.time,
                status: 'booked',
            });
            return HttpResponse_1.default.Ok(appointment);
        });
    }
}
exports.default = AppointmentCreation;
