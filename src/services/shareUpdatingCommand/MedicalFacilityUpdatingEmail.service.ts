import mongoose from "mongoose";
import { Auth } from "../../models/Auth.model";
import HttpResponse from "../../utils/HttpResponse";
import { IShareUpdatingCommand } from "../../types/IShareUpdatingCommand";

export class UpdateEmailCommand implements IShareUpdatingCommand {
  private newEmail: string;
  private authId: mongoose.Types.ObjectId;

  constructor(newEmail: string, authId: mongoose.Types.ObjectId) {
    this.newEmail = newEmail;
    this.authId = authId;
  }

  public async execute(): Promise<any> {
    const auth = await Auth.findById(this.authId);
    if (!auth) {
      throw HttpResponse.NotFound("Medical facility not found.");
    }
    
    const emailExists = await Auth.findOne({ email: this.newEmail });
    if (emailExists) {
      throw HttpResponse.BadRequest("Email is already in use.");
    }

    auth.email = this.newEmail;
    await auth.save();
    
    return HttpResponse.Ok(auth);
  }
}
