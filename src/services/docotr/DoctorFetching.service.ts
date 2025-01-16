import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { IDoctorFetchStrategy } from '../../types/IDoctorFetchStrategy';

export default class DoctorFetching implements IDoctorFetchStrategy {
  public async fetch(req: Request | any): Promise<any> {
    const doctorId = req.params.doctorId;
    return await Doctor.findOne({ _id: doctorId }).populate({
      path: "auth",
      select: "email",
    }).populate({
      path: "location",
    }).populate({
      path: "workSchedule"
    })
  }
}
