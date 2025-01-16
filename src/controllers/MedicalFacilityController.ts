import { NextFunction, Request, Response } from "express";
import IAccountFactory from "../factory/accountFactory/IAccountFactory";
import ILoginFactory from "../factory/LoginFactory/ILoginFactory";
import AccountFactory from "../factory/accountFactory/AccountFactory";
import LoginFactory from "../factory/LoginFactory/LoginFactory";
import HttpResponse from "../utils/HttpResponse";
import { MedicalFacilityFetchContext } from "../strategy/MedicalFacilityFetchContext";
import { MedicalFacilityFetching } from "../services/medicalFacility/MedicalFacilityFetching.service";
import { MedicalFacilitiesFetching } from "../services/medicalFacility/MedicalFacilitiesFetching.service";
import { MedicalFacilityUpdatingCommandInvoker } from "../command/MedicalFacilityUpdatingCommandInvoker";
import { UpdateInformationCommand } from "../services/medicalFacility/MedicalFacilityUpdatingInformation.service";
import { ShareUpdatingCommandInvoker } from "../command/ShareUpdatingCommandInvoker";
import { UpdatePasswordCommand } from "../services/shareUpdatingCommand/MedicalFacilityUpdatingPassword.service";
import { UpdateEmailCommand } from "../services/shareUpdatingCommand/MedicalFacilityUpdatingEmail.service";
import { MedicalFacility } from "../models/medicalFacility.model";
import { UpdateWorkScheduleCommand } from "../services/workSchedule/WorkScheduleUpdating.service";
import { UpdateLocationCommand } from "../services/location/LoactionUpdating.service";


export default class MedicalFacilityController {

    private readonly _accountFactory: IAccountFactory;
    private readonly _loginFactory: ILoginFactory;


    public constructor() {

        this._accountFactory = AccountFactory.getInstance();
        this._loginFactory = LoginFactory.getInstance();

    }
    public async createAccount(req: Request,res:Response,next:NextFunction) {
        const document = await this._accountFactory.CreateObject("medicalFacility")?.handle(req);
        if (!document) {
            HttpResponse.InternalServerError();
        }
        const data = HttpResponse.Created(document);
        return res.status(data.statusCode).json(data);
    }

    public async login(req: Request, res: Response,next:NextFunction) {
        const document = await this._loginFactory.CreateObject("medicalFacility")?.handle(req,);
        
        if (!document) {
            HttpResponse.InternalServerError();
        }
        const data = HttpResponse.Ok(document);
        return res.status(data.statusCode).json(data);
    }

    public async fetchMedicalFacility(req: Request, res: Response, next: NextFunction) {
        const strategy = new MedicalFacilityFetching();

        // Create a FetchContext with the strategy
        const fetchContext = new MedicalFacilityFetchContext(strategy);

        // Use the FetchContext to handle the request
        await fetchContext.handle(req, res);
    }

    public async fetchMedicalFacilities(req: Request, res: Response, next: NextFunction) {
        const strategy = new MedicalFacilitiesFetching();

        // Create a FetchContext with the strategy
        const fetchContext = new MedicalFacilityFetchContext(strategy);

        // Use the FetchContext to handle the request
        await fetchContext.handle(req, res);
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
        const { name, phone, photo,description } = req.body;
        const accountId = req.accountId

        const command = new UpdateInformationCommand(name, phone, photo, accountId,description)

        const result = await MedicalFacilityUpdatingCommandInvoker.executeCommand(command);

        res.status(result.statusCode).json(result);
    }

    public async updatingLocation(req: Request|any, res: Response, next: NextFunction) {
        const { city, address, coordinates, suburb } = req.body;
        const accountId = req.accountId
        const medicalFacility = await MedicalFacility.findById(accountId);
        if(!medicalFacility){
            throw HttpResponse.NotFound("medical Facility Not Found")
        }
        const command = new UpdateLocationCommand(city, address, coordinates, medicalFacility.location, suburb);
        const result = await command.execute();
        res.status(result.statusCode).json(result);
    }
    
    public async updatingWorkSchedul(req: Request|any, res: Response, next: NextFunction) {
        const { Sunday,Monday, Tuesday, Wednesday,Thursday,Friday,Saturday } = req.body;
        const accountId = req.accountId
        const medicalFacility = await MedicalFacility.findById(accountId);
        if(!medicalFacility){
            throw HttpResponse.NotFound("medical Facility Not Found")
        }
        const command = new UpdateWorkScheduleCommand(Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,medicalFacility.workSchedule);
        const result = await command.execute();
        res.status(result.statusCode).json(result);
    }
    

}
