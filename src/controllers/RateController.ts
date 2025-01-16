

import { NextFunction, Request, Response } from "express";

import { FeedbackCommandInvoker } from "../command/FeedbackCommandInvoker copy";
import RatingCreation from "../services/rate/RatingCreation";
import RatingUpdate from "../services/rate/RatingUpdate";




export default class RateController {

    public constructor() {
    }
    public async createRating(req: Request | any, res: Response, next: NextFunction) {
        const { doctorId, rating } = req.body;
        const patientId = req.accountId

        const command = new RatingCreation(doctorId, patientId, rating);
        const result = await FeedbackCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }
    public async updateRating(req: Request | any, res: Response, next: NextFunction) {
        const commentId = req.params.commentId;
        const patientId = req.accountId;
        const {newRating} = req.body;
        const command = new RatingUpdate(patientId,commentId,newRating);
        const result = await FeedbackCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }

}
