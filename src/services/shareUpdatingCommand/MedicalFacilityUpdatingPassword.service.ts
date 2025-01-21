import mongoose from "mongoose";
import { Auth } from "../../models/Auth.model";
import HttpResponse from "../../utils/HttpResponse";
import IPasswordService from "../password/IPassword";
import PasswordService from "../password/password.service";
import { IMedicalFacilityUpdatingCommand } from "../../types/IMedicalFacilityUpdatingCommand";
import { IShareUpdatingCommand } from "../../types/IShareUpdatingCommand";

export class UpdatePasswordCommand implements IShareUpdatingCommand {
  private currentPassword: string;
  private newPassword: string;
  private authId: mongoose.Types.ObjectId;
  private passwordService: IPasswordService;

  constructor(
    currentPassword: string,
    newPassword: string,
    authId: mongoose.Types.ObjectId
  ) {
    this.currentPassword = currentPassword;
    this.newPassword = newPassword;
    this.authId = authId;
    this.passwordService = new PasswordService();
  }

  public async execute(): Promise<any> {
    console.log("hello")
    const auth = await Auth.findById(this.authId);
    if (!auth) {
      throw HttpResponse.NotFound("account not found.");
    }
    
    console.log(auth)
    const isPasswordValid = await this.passwordService.comparePasswords(
      this.currentPassword,
      auth.password
    );
    if (!isPasswordValid) {
      throw HttpResponse.BadRequest("Current password is incorrect.");
    }

    const hashedNewPassword = await this.passwordService.hashPassword(
      this.newPassword
    );
    auth.password = hashedNewPassword;
    auth.passwordChangedAt = new Date();
    await auth.save();

    return HttpResponse.Ok(auth);
  }
}
