import { NextFunction, Request, Response } from "express";
import IAccountFactory from "../factory/accountFactory/IAccountFactory";
import ILoginFactory from "../factory/LoginFactory/ILoginFactory";
import AccountFactory from "../factory/accountFactory/AccountFactory";
import LoginFactory from "../factory/LoginFactory/LoginFactory";
import HttpResponse from "../utils/HttpResponse";

import { ShareUpdatingCommandInvoker } from "../command/ShareUpdatingCommandInvoker";
import { UpdatePasswordCommand } from "../services/shareUpdatingCommand/MedicalFacilityUpdatingPassword.service";
import { UpdateEmailCommand } from "../services/shareUpdatingCommand/MedicalFacilityUpdatingEmail.service";
import UpdateInformationCommand from "../services/patient/PatientUpdatingInformation.service";
import { PatientUpdatingCommandInvoker } from "../command/PatientUpdatingCommandInvoker";
import { AppointmentCommandInvoker } from "../command/AppointmentCommandInvoker";
import AppointmentCreation from "../services/appointment/AppointmentCreation.service";
import AppointmentCanciling from "../services/appointment/AppointmentCanciling.service";



export default class PatientController {

    private readonly _accountFactory: IAccountFactory;
    private readonly _loginFactory: ILoginFactory;

    public constructor() {

        this._accountFactory = AccountFactory.getInstance();
        this._loginFactory = LoginFactory.getInstance();

    }
    public async createAccount(req: Request,res:Response,next:NextFunction) {
        const document = await this._accountFactory.CreateObject("patient")?.handle(req);
        const data = HttpResponse.Created(document);
        return res.status(data.statusCode).json(document);
    }

    public async login(req: Request, res: Response,next:NextFunction) {
        const document = await this._loginFactory.CreateObject("patient")?.handle(req,);
        const data = HttpResponse.Ok(document);
        return res.status(data.statusCode).json(document);
    }


    public async updatingEmail(req: Request|any, res: Response, next: NextFunction) {
        const { newEmail } = req.body;
        const authId = req.authId
        const command = new UpdateEmailCommand(newEmail, authId);
        const result = await ShareUpdatingCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }

    public async updatingPassword(req: Request|any, res: Response, next: NextFunction) {
        const { currentPassword, newPassword } = req.body;
        const authId = req.authId

        const command = new UpdatePasswordCommand(
            currentPassword,
            newPassword,
            authId
        );
        const result = await ShareUpdatingCommandInvoker.executeCommand(command);

        res.status(result.statusCode).json(result);
    }

    public async updatingInformation(req: Request|any, res: Response, next: NextFunction) {
        const { firstName, lastName ,phone, photo } = req.body;
        const accountId = req.accountId
        // UpdateInformationCommand
        const command = new UpdateInformationCommand(firstName,lastName,phone,photo,accountId);
        const result = await PatientUpdatingCommandInvoker.executeCommand(command);
        res.status(result.statusCode).json(result);
    }




}
