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
const AccountFactory_1 = __importDefault(require("../factory/accountFactory/AccountFactory"));
const LoginFactory_1 = __importDefault(require("../factory/LoginFactory/LoginFactory"));
const HttpResponse_1 = __importDefault(require("../utils/HttpResponse"));
const ShareUpdatingCommandInvoker_1 = require("../command/ShareUpdatingCommandInvoker");
const MedicalFacilityUpdatingPassword_service_1 = require("../services/shareUpdatingCommand/MedicalFacilityUpdatingPassword.service");
const MedicalFacilityUpdatingEmail_service_1 = require("../services/shareUpdatingCommand/MedicalFacilityUpdatingEmail.service");
const PatientUpdatingInformation_service_1 = __importDefault(require("../services/patient/PatientUpdatingInformation.service"));
const PatientUpdatingCommandInvoker_1 = require("../command/PatientUpdatingCommandInvoker");
class PatientController {
    constructor() {
        this._accountFactory = AccountFactory_1.default.getInstance();
        this._loginFactory = LoginFactory_1.default.getInstance();
    }
    createAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const document = yield ((_a = this._accountFactory.CreateObject("patient")) === null || _a === void 0 ? void 0 : _a.handle(req));
            const data = HttpResponse_1.default.Created(document);
            return res.status(data.statusCode).json(document);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const document = yield ((_a = this._loginFactory.CreateObject("patient")) === null || _a === void 0 ? void 0 : _a.handle(req));
            const data = HttpResponse_1.default.Ok(document);
            return res.status(data.statusCode).json(document);
        });
    }
    updatingEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newEmail } = req.body;
            const authId = req.authId;
            const command = new MedicalFacilityUpdatingEmail_service_1.UpdateEmailCommand(newEmail, authId);
            const result = yield ShareUpdatingCommandInvoker_1.ShareUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updatingPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword } = req.body;
            console.log(currentPassword, newPassword);
            const authId = req.authId;
            const command = new MedicalFacilityUpdatingPassword_service_1.UpdatePasswordCommand(currentPassword, newPassword, authId);
            const result = yield ShareUpdatingCommandInvoker_1.ShareUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updatingInformation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, phone, photo } = req.body;
            const accountId = req.accountId;
            // UpdateInformationCommand
            const command = new PatientUpdatingInformation_service_1.default(firstName, lastName, phone, photo, accountId);
            const result = yield PatientUpdatingCommandInvoker_1.PatientUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
}
exports.default = PatientController;
