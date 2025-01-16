

import { NextFunction, Request, Response } from "express";
import { AppointmentCommandInvoker } from "../command/AppointmentCommandInvoker";
import AppointmentCreation from "../services/appointment/AppointmentCreation.service";
import AppointmentCanciling from "../services/appointment/AppointmentCanciling.service";
import AppointmentCompleting from "../services/appointment/AppointmentCompleting.service";
import AppointmentFetching from "../services/appointment/AppointmentFetching.service";
import { AppointmentFetchContext } from "../strategy/AppointmentFetchContext";
import AppointmentsFetching from "../services/appointment/AppointmentsFetching.service";
import AppointmentDetailsFetching from "../services/appointment/AppointmentDetails.service";




export default class AppointmentController {


    public constructor() {


    }
    public async createAppointment(req: Request | any, res: Response, next: NextFunction) {
        const { doctorId, date, time } = req.body;
        const patientId = req.accountId

        const command = new AppointmentCreation( doctorId, patientId, date, time);
        const result = await AppointmentCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }


    public async cancelAppointment(req: Request | any, res: Response, next: NextFunction) {
        const role = req.role;
        const appointmentId = req.params.appointmentId;
        const id = req.accountId;

        const command = new AppointmentCanciling(appointmentId, id, role);
        const result = await AppointmentCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }
    
    public async completeAppointment(req: Request | any, res: Response, next: NextFunction) {
        const appointmentId = req.params.appointmentId;
        const doctorId = req.accountId;
        const {diagnosis,medication,notes} = req.body;
        const command = new AppointmentCompleting(appointmentId,doctorId,diagnosis,medication,notes);
        const result = await AppointmentCommandInvoker.executeCommand(command);
        
        res.status(result.statusCode).json(result);
    }
    public async fetchAppointment(req: Request, res: Response, next: NextFunction) {
        const strategy = new AppointmentFetching();

        // Create a FetchContext with the strategy
        const fetchContext = new AppointmentFetchContext(strategy);

        // Use the FetchContext to handle the request
        await fetchContext.handle(req, res,next);
    }
    public async fetchAppointmentDetails(req: Request, res: Response, next: NextFunction) {
        const strategy = new AppointmentDetailsFetching();

        // Create a FetchContext with the strategy
        const fetchContext = new AppointmentFetchContext(strategy);

        // Use the FetchContext to handle the request
        await fetchContext.handle(req, res,next);
    } 

    public async fetchAppointments(req: Request, res: Response, next: NextFunction) {
        const strategy = new AppointmentsFetching();
        // Create a FetchContext with the strategy
        const fetchContext = new AppointmentFetchContext(strategy);

        // Use the FetchContext to handle the request
        await fetchContext.handle(req, res,next);
    }


}
