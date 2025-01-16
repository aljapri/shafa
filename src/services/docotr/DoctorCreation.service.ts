import mongoose, { ClientSession } from "mongoose";
import { Doctor } from "../../models/Doctor.model";
import HttpResponse from "../../utils/HttpResponse";

export default class DoctorCreationService {
  /**
   * Create a doctor record
   */
  public async create(
    body: any,
    authId: mongoose.Types.ObjectId,
    workScheduleId: mongoose.Types.ObjectId,
    locationId:mongoose.Types.ObjectId,
    session: ClientSession
  ) {
      const { firstName, lastName, phone, photo, gender, specialization, maxPatients, description,experience } = body;

      const doctor = await Doctor.create(
        [
          {
            firstName,
            lastName,
            auth:authId,
            phone,
            photo,
            gender,
            specialization,
            workSchedule:workScheduleId,
            maxPatients,
            description,
            experience,
            location:locationId,
          },
        ],
        { session }
      );

      return doctor[0];
  }
}
