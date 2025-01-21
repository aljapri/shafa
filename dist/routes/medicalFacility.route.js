"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const medicalFacility_model_1 = require("../models/medicalFacility.model");
const Authorize_middleware_1 = __importDefault(require("../middleware/Authorize.middleware"));
const jwt_service_1 = __importDefault(require("../services/jwt/jwt.service"));
const MedicalFacilityController_1 = __importDefault(require("../controllers/MedicalFacilityController"));
const DoctorController_1 = __importDefault(require("../controllers/DoctorController"));
const restrictTo_1 = require("../utils/restrictTo");
const authValidator_1 = require("../validator/authValidator");
const updateEmailValidator_1 = require("../validator/updateEmailValidator");
const updateMedicalFacility_1 = require("../validator/updateMedicalFacility");
const updatePasswordValidator_1 = require("../validator/updatePasswordValidator");
const updateLocationValidator_1 = require("../validator/updateLocationValidator");
const updateWorkSchedule_1 = require("../validator/updateWorkSchedule");
const medicalFacilityValidator_1 = require("../validator/medicalFacilityValidator");
const MulterHandler_1 = require("../middleware/MulterHandler");
const locationValidator_1 = require("../validator/locationValidator");
const workScheduleValidator_1 = require("../validator/workScheduleValidator");
const medicalFacilityRoutes = express_1.default.Router();
const medicalFacilityController = new MedicalFacilityController_1.default();
const doctorController = new DoctorController_1.default();
// Authorization middleware setup
const authorization = new Authorize_middleware_1.default(new jwt_service_1.default(), medicalFacility_model_1.MedicalFacility);
// Define routes
medicalFacilityRoutes.post('/', MulterHandler_1.upload.single('photo'), MulterHandler_1.setPhotoField, authValidator_1.signupValidator, medicalFacilityValidator_1.medialFacilityValidator, locationValidator_1.locationValidator, workScheduleValidator_1.workScheduleValidator, (0, catchAsync_1.default)(medicalFacilityController.createAccount.bind(medicalFacilityController)));
medicalFacilityRoutes.get('/', (0, catchAsync_1.default)(medicalFacilityController.fetchMedicalFacilities.bind(medicalFacilityController)));
medicalFacilityRoutes.get('/:medicalFacilityId', (0, catchAsync_1.default)(medicalFacilityController.fetchMedicalFacility.bind(medicalFacilityController)));
medicalFacilityRoutes.post('/login', authValidator_1.loginValidator, (0, catchAsync_1.default)(medicalFacilityController.login.bind(medicalFacilityController)));
// Protect the routes below with authorization middleware
medicalFacilityRoutes.use(authorization.authorize);
medicalFacilityRoutes.use((0, restrictTo_1.restrictTo)("medicalFacility"));
medicalFacilityRoutes.patch('/update-email', updateEmailValidator_1.updateEmailValidator, (0, catchAsync_1.default)(medicalFacilityController.updatingEmail.bind(medicalFacilityController)));
medicalFacilityRoutes.patch('/update-information', MulterHandler_1.upload.single('photo'), MulterHandler_1.setPhotoField, updateMedicalFacility_1.updateMedicalFacilityValidator, (0, catchAsync_1.default)(medicalFacilityController.updatingInformation.bind(medicalFacilityController)));
medicalFacilityRoutes.patch('/update-password', updatePasswordValidator_1.updatePasswordValidator, (0, catchAsync_1.default)(medicalFacilityController.updatingPassword.bind(medicalFacilityController)));
medicalFacilityRoutes.patch('/update-location', updateLocationValidator_1.updateLocationValidator, (0, catchAsync_1.default)(medicalFacilityController.updatingLocation.bind(medicalFacilityController)));
medicalFacilityRoutes.patch('/update-work-schedule', updateWorkSchedule_1.updateWorkScheduleValidator, (0, catchAsync_1.default)(medicalFacilityController.updatingWorkSchedul.bind(medicalFacilityController)));
exports.default = medicalFacilityRoutes;
