import HttpResponse from "../../utils/HttpResponse";
import { IDoctorUpdatingCommand } from "../../types/IDoctorUpdatingCommand";
import { Doctor } from "../../models/Doctor.model";
import { Patient } from "../../models/Patient.model";


export default class UpdateInformationCommand implements IDoctorUpdatingCommand {
  private firstName:string;
  private lastName:string;

  private phone:string;
  private photo:string;

  private accountId:string
  constructor(firstName:string,lastName:string,phone:string,photo:string,accountId:string) {
    this.firstName =firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.photo = photo;
    this.accountId = accountId;
  }

  public async execute(): Promise<any> {
    const document = await Patient.findById(this.accountId);
    if (!document) {
      throw HttpResponse.NotFound("patient facility not found.");
    }
    // Prepare the update data, excluding password and email
    console.log("one");
    if (this.firstName) document.firstName = this.firstName;
    if (this.lastName) document.lastName = this.lastName;
    if (this.phone) document.phone = this.phone;
    if (this.photo) document.photo = this.photo;



    await document.save();
    
    return HttpResponse.Ok(document);
  }
}