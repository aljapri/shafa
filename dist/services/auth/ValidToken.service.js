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
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const Auth_model_1 = require("../../models/Auth.model");
const Patient_model_1 = require("../../models/Patient.model");
class ValidToken {
    constructor(jwt, authorization) {
        // The authorization method that checks the token and attaches the decoded data
        this.execute = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const token = (_a = this._authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from header
            if (!token) {
                throw HttpResponse_1.default.Unauthorized('Invalid or expired token.');
            }
            try {
                // Verify the token using JWTService
                const decoded = yield this._jwtService.verifyToken(token); // Use JWTService's verify method
                const id = decoded.id;
                // Check if the user with the decoded ID exists in the database
                const auth = yield Auth_model_1.Auth.findById(id); // Query for the user by ID
                if (!auth) {
                    throw HttpResponse_1.default.Unauthorized('Invalid or expired token.');
                }
                // Check if the JWT was issued before the password was last changed
                const tokenIssuedAt = decoded.iat * 1000; // `iat` is in seconds, multiply by 1000 to convert to milliseconds
                const passwordChangedAt = ((_b = auth.passwordChangedAt) === null || _b === void 0 ? void 0 : _b.getTime()) || 0; // Default to 0 if the field is missing
                // If the token was issued before the last password change, the user needs to log in again
                if (tokenIssuedAt < passwordChangedAt) {
                    throw HttpResponse_1.default.Unauthorized('Invalid or expired token.');
                }
                let user;
                if (auth.role === 'patient') { // Fix typo: "patinet" -> "patient"
                    user = yield Patient_model_1.Patient.findOne({ auth: auth._id }).populate({
                        path: "auth",
                        select: "email _id"
                    }); // Find the patient associated with the auth ID
                    if (!user) {
                        throw HttpResponse_1.default.Unauthorized('Patient not found.');
                    }
                }
                if (!user) {
                    throw HttpResponse_1.default.Unauthorized('Invalid or expired token.');
                }
                // Return success response with user data (if applicable)
                return HttpResponse_1.default.Ok(user);
            }
            catch (error) {
                throw error;
            }
        });
        this._jwtService = jwt; // Create an instance of JWTService
        this._authorization = authorization;
    }
}
exports.default = ValidToken;
