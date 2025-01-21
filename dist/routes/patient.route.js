"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const Authorize_middleware_1 = __importDefault(require("../middleware/Authorize.middleware"));
const jwt_service_1 = __importDefault(require("../services/jwt/jwt.service"));
const restrictTo_1 = require("../utils/restrictTo");
const Patient_model_1 = require("../models/Patient.model");
const PatientController_1 = __importDefault(require("../controllers/PatientController"));
const patientValidator_1 = require("../validator/patientValidator");
const authValidator_1 = require("../validator/authValidator");
const updateEmailValidator_1 = require("../validator/updateEmailValidator");
const updatePasswordValidator_1 = require("../validator/updatePasswordValidator");
const appointmentByOwner_route_1 = __importDefault(require("./appointmentByOwner.route"));
const MulterHandler_1 = require("../middleware/MulterHandler");
const updatePatientValidator_1 = require("../validator/updatePatientValidator");
const rating_route_1 = __importDefault(require("./rating.route"));
const patientRoutes = express_1.default.Router({ mergeParams: true });
// Authorization middleware setup
const authorization = new Authorize_middleware_1.default(new jwt_service_1.default(), Patient_model_1.Patient);
const patientController = new PatientController_1.default();
patientRoutes.use("/appointmnets", authorization.authorize, appointmentByOwner_route_1.default);
patientRoutes.use("/ratings", authorization.authorize, rating_route_1.default);
// Define routes
patientRoutes.post('/', authValidator_1.signupValidator, patientValidator_1.patientValidator, (0, catchAsync_1.default)(patientController.createAccount.bind(patientController)));
patientRoutes.post('/login', authValidator_1.loginValidator, (0, catchAsync_1.default)(patientController.login.bind(patientController)));
// Protect the routes below with authorization middleware
patientRoutes.use(authorization.authorize);
patientRoutes.use((0, restrictTo_1.restrictTo)("patient"));
patientRoutes.patch('/update-email', updateEmailValidator_1.updateEmailValidator, (0, catchAsync_1.default)(patientController.updatingEmail.bind(patientController)));
patientRoutes.patch('/update-information', MulterHandler_1.upload.single('photo'), MulterHandler_1.setPhotoField, updatePatientValidator_1.updatePatientValidator, (0, catchAsync_1.default)(patientController.updatingInformation.bind(patientController)));
patientRoutes.patch('/update-password', updatePasswordValidator_1.updatePasswordValidator, (0, catchAsync_1.default)(patientController.updatingPassword.bind(patientController)));
// ---------------------------------------- appointmnets --------------------------------------------------
exports.default = patientRoutes;
