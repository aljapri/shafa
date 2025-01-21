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
const DoctorUpdatingInformation_service_1 = __importDefault(require("../services/docotr/DoctorUpdatingInformation.service"));
const DoctorUpdatingCommandInvoker_1 = require("../command/DoctorUpdatingCommandInvoker");
const DocotrFetchContext_1 = require("../strategy/DocotrFetchContext");
const DoctorFetching_service_1 = __importDefault(require("../services/docotr/DoctorFetching.service"));
const DoctorsFetching_service_1 = require("../services/docotr/DoctorsFetching.service");
const Doctor_model_1 = require("../models/Doctor.model");
const LoactionUpdating_service_1 = require("../services/location/LoactionUpdating.service");
const WorkScheduleUpdating_service_1 = require("../services/workSchedule/WorkScheduleUpdating.service");
class DoctorController {
    constructor() {
        this._accountFactory = AccountFactory_1.default.getInstance();
        this._loginFactory = LoginFactory_1.default.getInstance();
    }
    createAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const document = yield ((_a = this._accountFactory.CreateObject("doctor")) === null || _a === void 0 ? void 0 : _a.handle(req));
            if (!document) {
                HttpResponse_1.default.InternalServerError();
            }
            const data = HttpResponse_1.default.Created(document);
            return res.status(data.statusCode).json(document);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const document = yield ((_a = this._loginFactory.CreateObject("doctor")) === null || _a === void 0 ? void 0 : _a.handle(req));
            if (!document) {
                HttpResponse_1.default.InternalServerError();
            }
            const data = HttpResponse_1.default.Ok(document);
            return res.status(data.statusCode).json(document);
        });
    }
    fetchDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new DoctorFetching_service_1.default();
            // Create a FetchContext with the strategy
            const fetchContext = new DocotrFetchContext_1.DocotrFetchContext(strategy);
            // Use the FetchContext to handle the request
            yield fetchContext.handle(req, res, next);
        });
    }
    fetchDoctors(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new DoctorsFetching_service_1.DoctorsFetching();
            // Create a FetchContext with the strategy
            const fetchContext = new DocotrFetchContext_1.DocotrFetchContext(strategy);
            // Use the FetchContext to handle the request
            yield fetchContext.handle(req, res, next);
        });
    }
    updatingEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newEmail } = req.body;
            const doctorId = req.accountId;
            const docotr = yield Doctor_model_1.Doctor.findById(doctorId);
            if (!docotr) {
                throw HttpResponse_1.default.NotFound("User not found");
            }
            const command = new MedicalFacilityUpdatingEmail_service_1.UpdateEmailCommand(newEmail, docotr.auth);
            const result = yield ShareUpdatingCommandInvoker_1.ShareUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updatingPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword } = req.body;
            const doctorId = req.accountId;
            const docotr = yield Doctor_model_1.Doctor.findById(doctorId);
            if (!docotr) {
                throw HttpResponse_1.default.NotFound("User not found");
            }
            const command = new MedicalFacilityUpdatingPassword_service_1.UpdatePasswordCommand(currentPassword, newPassword, docotr.auth);
            const result = yield ShareUpdatingCommandInvoker_1.ShareUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updatingInformation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, specialization, phone, photo, gender, maxPatients, description, experience } = req.body;
            let accountId = req.accountId;
            const command = new DoctorUpdatingInformation_service_1.default(firstName, lastName, specialization, description, phone, photo, gender, maxPatients, experience, accountId);
            const result = yield DoctorUpdatingCommandInvoker_1.DoctorUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updatingWorkSchedule(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = req.body;
            let accountId = req.accountId;
            const doctor = yield Doctor_model_1.Doctor.findById(accountId);
            if (!doctor) {
                throw HttpResponse_1.default.NotFound("doctor Not Found");
            }
            const command = new WorkScheduleUpdating_service_1.UpdateWorkScheduleCommand(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, doctor.workSchedule);
            const result = yield command.execute();
            res.status(result.statusCode).json(result);
        });
    }
    updatingLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { city, address, coordinates, suburb } = req.body;
            const accountId = req.accountId;
            const docotr = yield Doctor_model_1.Doctor.findById(accountId);
            if (!docotr) {
                throw HttpResponse_1.default.NotFound("doctor Not Found");
            }
            const command = new LoactionUpdating_service_1.UpdateLocationCommand(city, address, coordinates, docotr.location, suburb);
            const result = yield command.execute();
            res.status(result.statusCode).json(result);
        });
    }
}
exports.default = DoctorController;
