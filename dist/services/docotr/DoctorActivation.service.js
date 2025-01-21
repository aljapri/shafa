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
exports.DoctorActivation = void 0;
const Doctor_model_1 = require("../../models/Doctor.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const Auth_model_1 = require("../../models/Auth.model");
class DoctorActivation {
    execute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorId = req.params.id;
            const medicalFacilityId = req.id; // Assuming medicalFacilityId is set in the request object
            // Perform delete operation
            const docotr = yield Doctor_model_1.Doctor.findOne({ _id: doctorId, medicalFacilityId }).select("-password");
            if (!docotr) {
                return next(HttpResponse_1.default.NotFound('No docotr found'));
            }
            const auth = yield Auth_model_1.Auth.findOne({ _id: docotr.auth });
            if (!auth) {
                return next(HttpResponse_1.default.NotFound('No docotr found'));
            }
            auth.isActive = !auth.isActive;
            yield auth.save();
            // Respond with No Content
            return auth;
        });
    }
}
exports.DoctorActivation = DoctorActivation;
