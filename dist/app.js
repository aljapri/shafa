"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appError_1 = __importDefault(require("./utils/appError"));
const DB_1 = __importDefault(require("./database/DB"));
const dotenv = __importStar(require("dotenv"));
const ErrorControllers_1 = __importDefault(require("./controllers/ErrorControllers"));
const medicalFacility_route_1 = __importDefault(require("./routes/medicalFacility.route"));
const doctor_route_1 = __importDefault(require("./routes/doctor.route"));
const patient_route_1 = __importDefault(require("./routes/patient.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cors = require("cors");
// -------------run server----------------------
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
// -------------run server----------------------
require('dotenv').config();
dotenv.config();
const app = (0, express_1.default)();
app.use(cors({
    origin: '*', // Allows requests from any domain, you can specify a specific domain as well
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const url = process.env.DATABASE_URL;
const dbUrl = "mongodb://localhost:27017/app";
const db = DB_1.default.getInstance(url);
db.connect();
app.use("/api/v1/medical-facilities", medicalFacility_route_1.default);
app.use("/api/v1/doctors", doctor_route_1.default);
app.use("/api/v1/patients", patient_route_1.default);
app.use("/api/v1/auth", auth_route_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(ErrorControllers_1.default);
const port = process.env.PORT || 3000;
//---------------------- run server
const server = app.listen(port, () => {
    console.log(port);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
