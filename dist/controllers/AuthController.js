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
const AuthCommandInvoker_1 = require("../command/AuthCommandInvoker");
const ValidToken_service_1 = __importDefault(require("../services/auth/ValidToken.service"));
const jwt_service_1 = __importDefault(require("../services/jwt/jwt.service"));
class AuthController {
    constructor() {
    }
    checkToknValidation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = new ValidToken_service_1.default(new jwt_service_1.default(), req.headers.authorization || "");
            const result = yield AuthCommandInvoker_1.AuthCommandInvoker.executeCommand(command);
            console.log(result);
            res.status(result.statusCode).json(result);
        });
    }
}
exports.default = AuthController;
