import HttpResponse from "../../utils/HttpResponse";
import { IDoctorUpdatingCommand } from "../../types/IDoctorUpdatingCommand";
import { Doctor } from "../../models/Doctor.model";


export default class UpdateInformationCommand implements IDoctorUpdatingCommand {
  private firstName:string;
  private lastName:string;
  private specialization:string;
  private description:string;
  private phone:string;
  private photo:string;
  private maxPatients:number;
  private gender:string;
  private accountId:string
  private experience:number
  constructor(firstName:string,lastName:string,specialization:string,description:string,phone:string,photo:string,maxPatients:number,gender:string,experience:number,accountId:string) {
    this.firstName =firstName;
    this.lastName = lastName;
    this.specialization = specialization;
    this.description = description;
    this.phone = phone;
    this.photo = photo;
    this.maxPatients = maxPatients;
    this.gender = gender;
    this.accountId = accountId;
    this.experience = experience;
  }

  public async execute(): Promise<any> {
    const document = await Doctor.findById(this.accountId);
    if (!document) {
      throw HttpResponse.NotFound("Medical facility not found.");
    }
    // Prepare the update data, excluding password and email

    if (this.firstName) document.firstName = this.firstName;
    if (this.lastName) document.lastName = this.lastName;
    if (this.specialization) document.specialization = this.specialization;
    if (this.description) document.description = this.description;
    if (this.phone) document.phone = this.phone;
    if (this.photo) document.photo = this.photo;
    if (this.maxPatients) document.maxPatients = this.maxPatients;
    if (this.gender) document.gender = this.gender;
    if (this.experience) document.experience = this.experience;


    await document.save();

    return HttpResponse.Ok(document);
  }
}

