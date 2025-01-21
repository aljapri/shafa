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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    constructor() {
        this._secretkey = process.env.JWT_SECRET || "your-secret-key";
    }
    // Method to generate a JWT token
    generateToken(payload, expiresIn) {
        // Signing the JWT with a payload and secret
        return jsonwebtoken_1.default.sign(payload, this._secretkey, { expiresIn });
    }
    // Method to verify the JWT token
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verifying the token with the secret
            return jsonwebtoken_1.default.verify(token, this._secretkey);
        });
    }
}
exports.default = JWTService;
