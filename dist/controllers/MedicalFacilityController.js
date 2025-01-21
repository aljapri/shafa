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
const MedicalFacilityFetchContext_1 = require("../strategy/MedicalFacilityFetchContext");
const MedicalFacilityFetching_service_1 = require("../services/medicalFacility/MedicalFacilityFetching.service");
const MedicalFacilitiesFetching_service_1 = require("../services/medicalFacility/MedicalFacilitiesFetching.service");
const MedicalFacilityUpdatingCommandInvoker_1 = require("../command/MedicalFacilityUpdatingCommandInvoker");
const MedicalFacilityUpdatingInformation_service_1 = require("../services/medicalFacility/MedicalFacilityUpdatingInformation.service");
const ShareUpdatingCommandInvoker_1 = require("../command/ShareUpdatingCommandInvoker");
const MedicalFacilityUpdatingPassword_service_1 = require("../services/shareUpdatingCommand/MedicalFacilityUpdatingPassword.service");
const MedicalFacilityUpdatingEmail_service_1 = require("../services/shareUpdatingCommand/MedicalFacilityUpdatingEmail.service");
const medicalFacility_model_1 = require("../models/medicalFacility.model");
const WorkScheduleUpdating_service_1 = require("../services/workSchedule/WorkScheduleUpdating.service");
const LoactionUpdating_service_1 = require("../services/location/LoactionUpdating.service");
class MedicalFacilityController {
    constructor() {
        this._accountFactory = AccountFactory_1.default.getInstance();
        this._loginFactory = LoginFactory_1.default.getInstance();
    }
    createAccount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const document = yield ((_a = this._accountFactory.CreateObject("medicalFacility")) === null || _a === void 0 ? void 0 : _a.handle(req));
            if (!document) {
                HttpResponse_1.default.InternalServerError();
            }
            const data = HttpResponse_1.default.Created(document);
            return res.status(data.statusCode).json(data);
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const document = yield ((_a = this._loginFactory.CreateObject("medicalFacility")) === null || _a === void 0 ? void 0 : _a.handle(req));
            if (!document) {
                HttpResponse_1.default.InternalServerError();
            }
            const data = HttpResponse_1.default.Ok(document);
            return res.status(data.statusCode).json(data);
        });
    }
    fetchMedicalFacility(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new MedicalFacilityFetching_service_1.MedicalFacilityFetching();
            // Create a FetchContext with the strategy
            const fetchContext = new MedicalFacilityFetchContext_1.MedicalFacilityFetchContext(strategy);
            // Use the FetchContext to handle the request
            yield fetchContext.handle(req, res);
        });
    }
    fetchMedicalFacilities(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new MedicalFacilitiesFetching_service_1.MedicalFacilitiesFetching();
            // Create a FetchContext with the strategy
            const fetchContext = new MedicalFacilityFetchContext_1.MedicalFacilityFetchContext(strategy);
            // Use the FetchContext to handle the request
            yield fetchContext.handle(req, res);
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
            const authId = req.authId;
            const command = new MedicalFacilityUpdatingPassword_service_1.UpdatePasswordCommand(currentPassword, newPassword, authId);
            const result = yield ShareUpdatingCommandInvoker_1.ShareUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updatingInformation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, phone, photo, description } = req.body;
            const accountId = req.accountId;
            const command = new MedicalFacilityUpdatingInformation_service_1.UpdateInformationCommand(name, phone, photo, accountId, description);
            const result = yield MedicalFacilityUpdatingCommandInvoker_1.MedicalFacilityUpdatingCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updatingLocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { city, address, coordinates, suburb } = req.body;
            const accountId = req.accountId;
            const medicalFacility = yield medicalFacility_model_1.MedicalFacility.findById(accountId);
            if (!medicalFacility) {
                throw HttpResponse_1.default.NotFound("medical Facility Not Found");
            }
            const command = new LoactionUpdating_service_1.UpdateLocationCommand(city, address, coordinates, medicalFacility.location, suburb);
            const result = yield command.execute();
            res.status(result.statusCode).json(result);
        });
    }
    updatingWorkSchedul(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday } = req.body;
            const accountId = req.accountId;
            const medicalFacility = yield medicalFacility_model_1.MedicalFacility.findById(accountId);
            if (!medicalFacility) {
                throw HttpResponse_1.default.NotFound("medical Facility Not Found");
            }
            const command = new WorkScheduleUpdating_service_1.UpdateWorkScheduleCommand(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, medicalFacility.workSchedule);
            const result = yield command.execute();
            res.status(result.statusCode).json(result);
        });
    }
}
exports.default = MedicalFacilityController;
