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
exports.UpdateEmailCommand = void 0;
const Auth_model_1 = require("../../models/Auth.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class UpdateEmailCommand {
    constructor(newEmail, authId) {
        this.newEmail = newEmail;
        this.authId = authId;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const auth = yield Auth_model_1.Auth.findById(this.authId);
            if (!auth) {
                throw HttpResponse_1.default.NotFound("Medical facility not found.");
            }
            const emailExists = yield Auth_model_1.Auth.findOne({ email: this.newEmail });
            if (emailExists) {
                throw HttpResponse_1.default.BadRequest("Email is already in use.");
            }
            auth.email = this.newEmail;
            yield auth.save();
            return HttpResponse_1.default.Ok(auth);
        });
    }
}
exports.UpdateEmailCommand = UpdateEmailCommand;
