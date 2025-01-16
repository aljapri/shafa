import mongoose, { ClientSession } from "mongoose";
import { MedicalFacility } from "../../models/medicalFacility.model";
import { Subscription } from "../../models/subscription.model";
import HttpResponse from "../../utils/HttpResponse";

export default class MedicalFacilityService {
  public async createMedicalFacility(
    body: any,
    authId: mongoose.Types.ObjectId,
    locationId: mongoose.Types.ObjectId,
    workScheduleId:mongoose.Types.ObjectId,
    session: ClientSession,
    
  ) {
    
      const { name, phone, medicalFacilityType,photo,description } = body;

      const medicalFacility = await MedicalFacility.create(
        [
          {
            name,
            phone,
            photo,
            location:locationId,
            medicalFacilityType,
            workSchedule:workScheduleId,
            auth:authId,
            description,
            isActive: true,
          },
        ],
        { session }
      );

      // Update subscription with the created medical facility ID
      

      return medicalFacility[0];
    
  }
}
