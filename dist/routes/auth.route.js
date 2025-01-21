"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const authRoutes = express_1.default.Router({ mergeParams: true });
const authController = new AuthController_1.default();
// Authorization middleware setup
authRoutes.get('/validate-token', (0, catchAsync_1.default)(authController.checkToknValidation.bind(authController)));
exports.default = authRoutes;
