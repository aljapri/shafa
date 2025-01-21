import { NextFunction, Request, Response } from "express";
import { AuthCommandInvoker } from "../command/AuthCommandInvoker";
import ValidToken from "../services/auth/ValidToken.service";
import JWTService from "../services/jwt/jwt.service";



export default class AuthController {

    public constructor() {

    }
    public async checkToknValidation(req:Request,res:Response,next:NextFunction){

        const command = new ValidToken(new JWTService(),req.headers.authorization || "");
        const result = await AuthCommandInvoker.executeCommand(command);
        console.log(result);
        res.status(result.statusCode).json(result);

    }

}
