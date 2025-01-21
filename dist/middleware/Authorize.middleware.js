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
const HttpResponse_1 = __importDefault(require("../utils/HttpResponse")); // Assuming you have HttpResponse class
const Auth_model_1 = require("../models/Auth.model");
class Authorize {
    constructor(jwt, model) {
        // The authorization method that checks the token and attaches the decoded data
        this.authorize = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract token from header
            if (!token) {
                return next(HttpResponse_1.default.Unauthorized('Invalid or expired token.'));
            }
            try {
                // Verify the token using JWTService
                const decoded = yield this._jwtService.verifyToken(token); // Use JWTService's verify method
                // Attach decoded user id to the request
                const id = decoded.id;
                // Check if the medical facility with the decoded ID exists in the database
                const auth = yield Auth_model_1.Auth.findById(id); // Query for the medical facility by ID
                if (!auth) {
                    return next(HttpResponse_1.default.Unauthorized('Invalid or expired token.'));
                }
                const account = yield this._find.findOne({ auth: auth._id });
                if (!account) {
                    return next(HttpResponse_1.default.Unauthorized('Invalid or expired token.'));
                }
                // Check if the JWT was issued before the password or email was last changed
                const tokenIssuedAt = decoded.iat * 1000; // `iat` is in seconds, multiply by 1000 to convert to milliseconds
                const passwordChangedAt = ((_b = auth.passwordChangedAt) === null || _b === void 0 ? void 0 : _b.getTime()) || 0; // Default to 0 if the field is missing
                // If the token was issued before the last password or email change, the user needs to log in again
                if (tokenIssuedAt < passwordChangedAt) {
                    return next(HttpResponse_1.default.Unauthorized('Invalid or expired token.'));
                }
                // Proceed to the next middleware if the token is valid
                req.authId = auth._id;
                req.role = auth.role;
                req.accountId = account._id;
                next();
            }
            catch (error) {
                return next(HttpResponse_1.default.Unauthorized('Invalid or expired token.'));
            }
        });
        this._jwtService = jwt; // Create an instance of JWTService
        this._find = model; // Create an instance of FindMedicalFacility
    }
}
exports.default = Authorize;
