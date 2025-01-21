import { Request, Response, NextFunction } from 'express';
import HttpResponse from '../utils/HttpResponse'; // Assuming you have HttpResponse class
import asyncWrapper from '../utils/catchAsync'; // Importing asyncWrapper

import { Model } from 'mongoose';
import { MedicalFacility } from '../models/medicalFacility.model';
import { Auth } from '../models/Auth.model';
import IAuthorize from '../types/IAuthorize';
import IJWT from '../services/jwt/IJW';
import { Doctor } from '../models/Doctor.model';

class Authorize implements IAuthorize {
  private readonly _jwtService: IJWT;
  private readonly _find: Model<any>;

  constructor(jwt: IJWT, model: Model<any>) {
    this._jwtService = jwt; // Create an instance of JWTService
    this._find = model; // Create an instance of FindMedicalFacility
  }

  // The authorization method that checks the token and attaches the decoded data
  public authorize = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from header
    if (!token) {
      return next(HttpResponse.Unauthorized('Invalid or expired token.'));
    }
    try {
      // Verify the token using JWTService
      const decoded = await this._jwtService.verifyToken(token); // Use JWTService's verify method
      // Attach decoded user id to the request
      const id = (decoded as any).id
      // Check if the medical facility with the decoded ID exists in the database
      const auth = await Auth.findById(id); // Query for the medical facility by ID
      if (!auth) {
        return next(HttpResponse.Unauthorized('Invalid or expired token.'));
      }
      const account = await this._find.findOne({auth:auth._id});

      if(!account){
        return next(HttpResponse.Unauthorized('Invalid or expired token.'));
      }
      // Check if the JWT was issued before the password or email was last changed
      const tokenIssuedAt = (decoded as any).iat * 1000; // `iat` is in seconds, multiply by 1000 to convert to milliseconds
      const passwordChangedAt = auth.passwordChangedAt?.getTime() || 0; // Default to 0 if the field is missing

      // If the token was issued before the last password or email change, the user needs to log in again
      if (tokenIssuedAt < passwordChangedAt) {
        return next(HttpResponse.Unauthorized('Invalid or expired token.'));
      }

      // Proceed to the next middleware if the token is valid
      req.authId = auth._id;
      req.role = auth.role; 
      req.accountId = account._id;
      next();
    } catch (error:any) {
      return next(HttpResponse.Unauthorized('Invalid or expired token.'));
    }
  };
}

export default Authorize;
