/*
    public async createAppointment(req: Request|any, res: Response, next: NextFunction) {
        const { medicalFacilityId,doctorId ,date, time} = req.body;
        const patientId = req.accountId

        const command = new AppointmentCreation(medicalFacilityId,doctorId,patientId,date,time);
        const result = await AppointmentCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }
    public async cancelAppointment(req: Request|any, res: Response, next: NextFunction) {

       const role = req.role;
       const appointmentId = req.params.appointmentId;
       const id = req.accountId;

        const command = new AppointmentCanciling(appointmentId,id,role);
        const result = await AppointmentCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }
*/

import { NextFunction, Request, Response } from "express";

import { FeedbackCommandInvoker } from "../command/FeedbackCommandInvoker copy";
import CommentCreation from "../services/comment/CommentCreation";
import CommentDeleting from "../services/comment/CommentDeleting";
import CommentUpdateing from "../services/comment/CommentUpdateing";
import { CommentFetchContext } from "../strategy/CommentFetchContext";




export default class RateController {

    public constructor() {
    }
    public async createRating(req: Request | any, res: Response, next: NextFunction) {
        const { doctorId, comment } = req.body;
        const patientId = req.accountId

        const command = new CommentCreation(doctorId, patientId, comment);
        const result = await FeedbackCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }
    public async updateRating(req: Request | any, res: Response, next: NextFunction) {

        const commentId = req.params.commentId;
        const patientId = req.accountId;
        const {newComment} = req.body;
        const command = new CommentUpdateing(patientId,commentId,newComment);
        const result = await FeedbackCommandInvoker.executeCommand(command);
        
        res.status(result.statusCode).json(result);
    }

}
