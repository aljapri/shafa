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
const Patient_model_1 = require("../../models/Patient.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class PatientCreationService {
    /**
     * Create a patient record
     */
    create(body, authId, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phone, photo } = body;
            try {
                // Create a new patient record
                const patient = yield Patient_model_1.Patient.create([
                    {
                        firstName,
                        lastName,
                        phone,
                        photo, // The uploaded photo filename is saved here
                        auth: authId,
                    },
                ], { session });
                return patient[0]; // Return the created patient record
            }
            catch (error) {
                throw HttpResponse_1.default.InternalServerError;
            }
        });
    }
}
exports.default = PatientCreationService;
