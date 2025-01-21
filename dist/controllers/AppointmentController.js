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
const AppointmentCommandInvoker_1 = require("../command/AppointmentCommandInvoker");
const AppointmentCreation_service_1 = __importDefault(require("../services/appointment/AppointmentCreation.service"));
const AppointmentCanciling_service_1 = __importDefault(require("../services/appointment/AppointmentCanciling.service"));
const AppointmentCompleting_service_1 = __importDefault(require("../services/appointment/AppointmentCompleting.service"));
const AppointmentFetching_service_1 = __importDefault(require("../services/appointment/AppointmentFetching.service"));
const AppointmentFetchContext_1 = require("../strategy/AppointmentFetchContext");
const AppointmentsFetching_service_1 = __importDefault(require("../services/appointment/AppointmentsFetching.service"));
const AppointmentDetails_service_1 = __importDefault(require("../services/appointment/AppointmentDetails.service"));
class AppointmentController {
    constructor() {
    }
    createAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { doctorId, date, time } = req.body;
            const patientId = req.accountId;
            const command = new AppointmentCreation_service_1.default(doctorId, patientId, date, time);
            const result = yield AppointmentCommandInvoker_1.AppointmentCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    cancelAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = req.role;
            const appointmentId = req.params.appointmentId;
            const id = req.accountId;
            const command = new AppointmentCanciling_service_1.default(appointmentId, id, role);
            const result = yield AppointmentCommandInvoker_1.AppointmentCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    completeAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointmentId = req.params.appointmentId;
            const doctorId = req.accountId;
            const { diagnosis, medication, notes } = req.body;
            const command = new AppointmentCompleting_service_1.default(appointmentId, doctorId, diagnosis, medication, notes);
            const result = yield AppointmentCommandInvoker_1.AppointmentCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    fetchAppointment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new AppointmentFetching_service_1.default();
            // Create a FetchContext with the strategy
            const fetchContext = new AppointmentFetchContext_1.AppointmentFetchContext(strategy);
            // Use the FetchContext to handle the request
            yield fetchContext.handle(req, res, next);
        });
    }
    fetchAppointmentDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new AppointmentDetails_service_1.default();
            // Create a FetchContext with the strategy
            const fetchContext = new AppointmentFetchContext_1.AppointmentFetchContext(strategy);
            // Use the FetchContext to handle the request
            yield fetchContext.handle(req, res, next);
        });
    }
    fetchAppointments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new AppointmentsFetching_service_1.default();
            // Create a FetchContext with the strategy
            const fetchContext = new AppointmentFetchContext_1.AppointmentFetchContext(strategy);
            // Use the FetchContext to handle the request
            yield fetchContext.handle(req, res, next);
        });
    }
}
exports.default = AppointmentController;
