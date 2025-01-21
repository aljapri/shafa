"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const Authorize_middleware_1 = __importDefault(require("../middleware/Authorize.middleware"));
const jwt_service_1 = __importDefault(require("../services/jwt/jwt.service"));
const DoctorController_1 = __importDefault(require("../controllers/DoctorController"));
const restrictTo_1 = require("../utils/restrictTo");
const appointmentByOwner_route_1 = __importDefault(require("./appointmentByOwner.route"));
const doctorValidator_1 = require("../validator/doctorValidator");
const updateDocotrInformation_1 = require("../validator/updateDocotrInformation");
const updateWorkSchedule_1 = require("../validator/updateWorkSchedule");
const MulterHandler_1 = require("../middleware/MulterHandler");
const updateLocationValidator_1 = require("../validator/updateLocationValidator");
const updateEmailValidator_1 = require("../validator/updateEmailValidator");
const updatePasswordValidator_1 = require("../validator/updatePasswordValidator");
const authValidator_1 = require("../validator/authValidator");
const locationValidator_1 = require("../validator/locationValidator");
const workScheduleValidator_1 = require("../validator/workScheduleValidator");
const Doctor_model_1 = require("../models/Doctor.model");
const doctorRoutes = express_1.default.Router({ mergeParams: true });
const doctorController = new DoctorController_1.default();
// Authorization middleware setup
const authorization = new Authorize_middleware_1.default(new jwt_service_1.default(), Doctor_model_1.Doctor);
doctorRoutes.use("/appointmnets", authorization.authorize, (0, restrictTo_1.restrictTo)("doctor"), appointmentByOwner_route_1.default);
doctorRoutes.post('/', doctorValidator_1.doctorValidator, MulterHandler_1.setPhotoField, authValidator_1.signupValidator, doctorValidator_1.doctorValidator, locationValidator_1.locationValidator, workScheduleValidator_1.workScheduleValidator, (0, catchAsync_1.default)(doctorController.createAccount.bind(doctorController)));
doctorRoutes.post('/login', authValidator_1.loginValidator, (0, catchAsync_1.default)(doctorController.login.bind(doctorController)));
doctorRoutes.get('/', (0, catchAsync_1.default)(doctorController.fetchDoctors.bind(doctorController)));
doctorRoutes.get('/:doctorId', (0, catchAsync_1.default)(doctorController.fetchDoctor.bind(doctorController)));
doctorRoutes.use(authorization.authorize);
doctorRoutes.use((0, restrictTo_1.restrictTo)("doctor"));
doctorRoutes.patch('/update-information', MulterHandler_1.upload.single('photo'), MulterHandler_1.setPhotoField, updateDocotrInformation_1.updateDoctorValidator, (0, catchAsync_1.default)(doctorController.updatingInformation.bind(doctorController)));
doctorRoutes.patch('/update-work-schedule', updateWorkSchedule_1.updateWorkScheduleValidator, (0, catchAsync_1.default)(doctorController.updatingWorkSchedule.bind(doctorController)));
doctorRoutes.patch('/update-location', updateLocationValidator_1.updateLocationValidator, (0, catchAsync_1.default)(doctorController.updatingLocation.bind(doctorController)));
doctorRoutes.patch('/update-password', updatePasswordValidator_1.updatePasswordValidator, (0, catchAsync_1.default)(doctorController.updatingPassword.bind(doctorController)));
doctorRoutes.patch('/update-email', updateEmailValidator_1.updateEmailValidator, (0, catchAsync_1.default)(doctorController.updatingEmail.bind(doctorRoutes)));
exports.default = doctorRoutes;
