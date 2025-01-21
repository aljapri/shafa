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
const BaseFetchStrategy_1 = require("../../utils/BaseFetchStrategy");
class AppointmentsFetching extends BaseFetchStrategy_1.BaseFetchStrategy {
    /**
     * Fetch appointments based on the owner (patient or doctor) and optional date filters.
     * @param req - The request object containing the owner ID and query parameters.
     * @returns Promise containing the fetched appointments.
     */
    fetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const ownerId = req.accountId; // Owner ID (can be a patient or doctor ID)
            const queryDate = req.query.date ? new Date(req.query.date) : new Date();
            const status = req.query.status;
            const date = req.query.date;
            // Get the beginning and end of the specified day
            const startOfDay = new Date(queryDate);
            startOfDay.setUTCHours(0, 0, 0, 0);
            const endOfDay = new Date(queryDate);
            endOfDay.setUTCHours(0, 0, 0, 0);
            endOfDay.setDate(queryDate.getDate() + 1);
            // Determine whether the ID is for a patient or doctor and build the query conditions
            const queryConditions = {};
            if (date) {
                queryConditions.date = { $gte: startOfDay, $lt: endOfDay };
            }
            if (status) {
                queryConditions.status = status;
            }
            // Check if the role is doctor or patient and build conditions
            if (req.role === 'doctor') {
                queryConditions.doctor = ownerId;
            }
            else if (req.role === 'patient') {
                queryConditions.patient = ownerId;
            }
            else {
                throw new Error('Invalid owner type. Specify if the ID belongs to a patient or a doctor.');
            }
            // Build and execute the query with API features (pagination, filtering, etc.)
            const baseQuery = Appointment_model_1.Appointment.find(queryConditions)
                .populate('patient', 'firstName lastName') // Populate patient fields
                .populate('doctor', 'firstName lastName specialization'); // Populate doctor fields
            // Use BaseFetchStrategy's applyAPIFeatures method to handle sorting, limiting fields, and pagination
            const features = this.applyAPIFeatures(baseQuery, req.query);
            const paginationResult = yield features;
            return paginationResult;
        });
    }
}
exports.default = AppointmentsFetching;
