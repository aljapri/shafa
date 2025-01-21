"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppointmentController_1 = __importDefault(require("../controllers/AppointmentController"));
const appointmentValidator_1 = require("../validator/appointmentValidator");
const completeAppointmnetValidator_1 = require("../validator/completeAppointmnetValidator");
const appointmentRoutes = express_1.default.Router({ mergeParams: true });
const appointmentController = new AppointmentController_1.default();
// Authorization middleware setup
appointmentRoutes.get('/', (0, catchAsync_1.default)(appointmentController.fetchAppointments.bind(appointmentController)));
appointmentRoutes.post('/', appointmentValidator_1.createAppointmentValidator, (0, catchAsync_1.default)(appointmentController.createAppointment.bind(appointmentController)));
appointmentRoutes.get('/:appointmentId', (0, catchAsync_1.default)(appointmentController.fetchAppointment.bind(appointmentController)));
appointmentRoutes.post('/:appointmentId/complete', completeAppointmnetValidator_1.completeAppointmentValidation, (0, catchAsync_1.default)(appointmentController.completeAppointment.bind(appointmentController)));
appointmentRoutes.patch('/:appointmentId/cancel', (0, catchAsync_1.default)(appointmentController.cancelAppointment.bind(appointmentController)));
appointmentRoutes.get('/:appointmentId/detail', (0, catchAsync_1.default)(appointmentController.fetchAppointmentDetails.bind(appointmentController)));
exports.default = appointmentRoutes;
