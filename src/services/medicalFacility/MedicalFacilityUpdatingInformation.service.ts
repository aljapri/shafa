import mongoose from "mongoose";
import { MedicalFacility } from "../../models/medicalFacility.model";
import HttpResponse from "../../utils/HttpResponse";
import { IMedicalFacilityUpdatingCommand } from "../../types/IMedicalFacilityUpdatingCommand";

export class UpdateInformationCommand implements IMedicalFacilityUpdatingCommand {
  private name: string;
  private phone: string;
  private photo: string;
  private accountId: mongoose.Types.ObjectId;
  private description:string;
  constructor(
    name: string,
    phone: string,
    photo: string,
    accountId: mongoose.Types.ObjectId,
    description:string
  ) {
    this.name = name;
    this.phone = phone;
    this.photo = photo;
    this.accountId = accountId;
    this.description = description;
  }

  public async execute(): Promise<any> {
    const document = await MedicalFacility.findById(this.accountId);
    if (!document) {
      throw HttpResponse.NotFound("Medical facility not found.");
    }

    if (this.name) document.name = this.name;
    if (this.phone) document.phone = this.phone;
    if (this.photo) document.photo = this.photo;
    if(this.description) document.description = this.description;

    await document.save();

    return HttpResponse.Ok(document);
  }
}

