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
const password_service_1 = __importDefault(require("../password/password.service"));
const jwt_service_1 = __importDefault(require("../jwt/jwt.service"));
class AccountLoginBase {
    constructor(passwordService = new password_service_1.default(), jwtService = new jwt_service_1.default()) {
        this._passwordService = passwordService;
        this._jwt = jwtService;
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = input;
            // Find the medical facility by email
            const authRecord = yield Auth_model_1.Auth.findOne({ email });
            if (!authRecord) {
                throw HttpResponse_1.default.NotFound('Invalid email or password.');
            }
            // Validate password
            const isPasswordValid = yield this._passwordService.comparePasswords(password, authRecord.password);
            if (!isPasswordValid) {
                throw HttpResponse_1.default.NotFound('Invalid email or password.');
            }
            return authRecord;
        });
    }
    tokenGeneration(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this._jwt.generateToken({ id: id }, '24h');
            if (!token) {
                throw HttpResponse_1.default.NotFound('Invalid email or password.');
            }
            return token;
        });
    }
}
exports.default = AccountLoginBase;
