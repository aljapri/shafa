import { Request, Response, NextFunction } from 'express';
import IJWT from '../jwt/IJW';
import HttpResponse from '../../utils/HttpResponse';
import { Auth } from '../../models/Auth.model';
import { IAuthCommand } from '../../types/IAuthCommand';


class ValidToken implements IAuthCommand {
  private readonly _jwtService: IJWT;
    private readonly _authorization:string;
  constructor(jwt: IJWT,authorization:string) {
    this._jwtService = jwt; // Create an instance of JWTService
    this._authorization = authorization;
  }

  // The authorization method that checks the token and attaches the decoded data
  public execute = async (): Promise<any> => {
    const token = this._authorization?.split(' ')[1]; // Extract token from header
    if (!token) {
        throw HttpResponse.Unauthorized('Invalid or expired token.');
    }
    try {
      // Verify the token using JWTService
      const decoded = await this._jwtService.verifyToken(token); // Use JWTService's verify method
      // Attach decoded user id to the request
      const id = (decoded as any).id
      // Check if the medical facility with the decoded ID exists in the database
      const auth = await Auth.findById(id); // Query for the medical facility by ID
      if (!auth) {
        throw HttpResponse.Unauthorized('Invalid or expired token.');
      }
      
      // Check if the JWT was issued before the password or email was last changed
      const tokenIssuedAt = (decoded as any).iat * 1000; // `iat` is in seconds, multiply by 1000 to convert to milliseconds
      const passwordChangedAt = auth.passwordChangedAt?.getTime() || 0; // Default to 0 if the field is missing

      // If the token was issued before the last password or email change, the user needs to log in again
      if (tokenIssuedAt < passwordChangedAt) {
        throw HttpResponse.Unauthorized('Invalid or expired token.');
      }

      // Proceed to the next middleware if the token is valid
      return HttpResponse.Ok({message:"Token is Valid"});
    } catch (error:any) {
      throw error;
    }
  };
}

export default ValidToken;
