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
const mongoose_1 = __importDefault(require("mongoose"));
const Auth_model_1 = require("../../models/Auth.model");
const password_service_1 = __importDefault(require("../password/password.service"));
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class AccountCreationBase {
    constructor() {
        this.passwordService = new password_service_1.default();
    }
    createAuth(email, password, role, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingAuth = yield Auth_model_1.Auth.findOne({ email }).session(session);
            if (existingAuth) {
                throw HttpResponse_1.default.NotFound("Email is already taken.");
            }
            const hashedPassword = yield this.passwordService.hashPassword(password);
            const auth = yield Auth_model_1.Auth.create([{ email, password: hashedPassword, role: role }], { session });
            return auth[0]; // Assuming create returns an array with the created record
        });
    }
    withTransaction(action) {
        return __awaiter(this, void 0, void 0, function* () {
            const session = yield mongoose_1.default.startSession();
            session.startTransaction();
            try {
                const result = yield action(session);
                yield session.commitTransaction();
                return result;
            }
            catch (error) {
                yield session.abortTransaction();
                throw error;
            }
            finally {
                session.endSession();
            }
        });
    }
}
exports.default = AccountCreationBase;
