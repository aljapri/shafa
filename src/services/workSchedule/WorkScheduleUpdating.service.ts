import HttpResponse from "../../utils/HttpResponse";
import { WorkSchedule } from "../../models/WorkSchedule.model";

import mongoose, { Model } from "mongoose";

export class UpdateWorkScheduleCommand {
  private Sunday:any;
  private Monday:any;
  private Tuesday:any;
  private Wednesday:any;
  private Thursday:any;
  private Friday:any;
  private Saturday:any;
  private id:mongoose.Types.ObjectId;
  constructor(
    Sunday:any,
    Monday:any,
    Tuesday:any,
    Wednesday:any,
    Thursday:any,
    Friday:any,
    Saturday:any,
    id:mongoose.Types.ObjectId,
  ) {
    this.Sunday = Sunday;
    this.Monday = Monday;
    this.Tuesday = Tuesday;
    this.Wednesday = Wednesday;
    this.Thursday = Thursday;
    this.Friday = Friday;
    this.Saturday = Saturday;
    this.id = id;
  }

  public async execute(): Promise<any> {
    
    const document = await WorkSchedule.findById(this.id) ;
    if(!document){
      throw HttpResponse.NotFound("docotr not found.");
    }
    if (this.Sunday) document.sunday = this.Sunday;
    if (this.Monday) document.monday = this.Monday;
    if (this.Tuesday) document.tuesday = this.Tuesday;
    if (this.Wednesday) document.wednesday = this.Wednesday;
    if (this.Thursday) document.thursday = this.Thursday;
    if (this.Friday) document.friday = this.Friday;
    if (this.Saturday) document.saturday = this.Saturday;

    await document.save();

    return HttpResponse.Ok(document);
  }
}


