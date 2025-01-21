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
exports.UpdatePasswordCommand = void 0;
const Auth_model_1 = require("../../models/Auth.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const password_service_1 = __importDefault(require("../password/password.service"));
class UpdatePasswordCommand {
    constructor(currentPassword, newPassword, authId) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
        this.authId = authId;
        this.passwordService = new password_service_1.default();
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hello");
            const auth = yield Auth_model_1.Auth.findById(this.authId);
            if (!auth) {
                throw HttpResponse_1.default.NotFound("account not found.");
            }
            console.log(auth);
            const isPasswordValid = yield this.passwordService.comparePasswords(this.currentPassword, auth.password);
            if (!isPasswordValid) {
                throw HttpResponse_1.default.BadRequest("Current password is incorrect.");
            }
            const hashedNewPassword = yield this.passwordService.hashPassword(this.newPassword);
            auth.password = hashedNewPassword;
            auth.passwordChangedAt = new Date();
            yield auth.save();
            return HttpResponse_1.default.Ok(auth);
        });
    }
}
exports.UpdatePasswordCommand = UpdatePasswordCommand;
