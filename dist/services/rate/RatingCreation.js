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
const Rating_model_1 = require("../../models/Rating.model");
const Patient_model_1 = require("../../models/Patient.model");
const Doctor_model_1 = require("../../models/Doctor.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class RatingCreation {
    /**
     * Constructor for initializing RatingCreation with necessary parameters.
     * @param doctorId - The ID of the doctor
     * @param patientId - The ID of the patient
     * @param ratingValue - The rating value (1-5)
     * @param isActive - Status of the rating (active or not)
     */
    constructor(doctorId, patientId, ratingValue, isActive = true) {
        this.doctorId = doctorId;
        this.patientId = patientId;
        this.ratingValue = ratingValue;
        this.isActive = isActive;
    }
    /**
     * Creates a rating after validation.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate patient
            const patient = yield Patient_model_1.Patient.findById(this.patientId);
            if (!patient) {
                throw HttpResponse_1.default.NotFound('Patient not found.');
            }
            // Validate doctor
            const doctor = yield Doctor_model_1.Doctor.findById(this.doctorId);
            if (!doctor) {
                throw HttpResponse_1.default.NotFound('Doctor not found.');
            }
            // Create the rating
            const rating = yield Rating_model_1.Rating.create({
                doctor: this.doctorId,
                patient: this.patientId,
                rating: this.ratingValue,
                isActive: this.isActive,
            });
            return HttpResponse_1.default.Ok(rating);
        });
    }
}
exports.default = RatingCreation;
