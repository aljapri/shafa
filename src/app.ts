import express, { NextFunction, Request, Response } from "express";
import AppError from "./utils/appError";
import DB from "./database/DB";
import * as dotenv from 'dotenv';
import globalErrorHandler from "./controllers/ErrorControllers";
import medicalFacilityRoutes from "./routes/medicalFacility.route";
import doctorRoutes from "./routes/doctor.route";
import patientRoutes from "./routes/patient.route";
import authRoutes from "./routes/auth.route";
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
const app = express();
app.use(cors({
  origin: '*',  // Allows requests from any domain, you can specify a specific domain as well
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const url = process.env.DATABASE_URL;
const dbUrl:any = url;
const db = DB.getInstance(dbUrl);
db.connect();

app.use("/api/v1/medical-facilities",medicalFacilityRoutes);
app.use("/api/v1/doctors",doctorRoutes);
app.use("/api/v1/patients",patientRoutes);
app.use("/api/v1/auth",authRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);
const port:any =  process.env.PORT || 3000;










//---------------------- run server
const server = app.listen(port,()=>{
    console.log(port)
})

process.on('unhandledRejection', (err:any) => {
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
  


