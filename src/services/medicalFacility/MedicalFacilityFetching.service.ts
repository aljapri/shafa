import { Request } from 'express';

import { MedicalFacility } from '../../models/medicalFacility.model';
import { IMedicalFacilityFetchStrategy } from '../../types/IMedicalFacilityFetchStrategy';

export class MedicalFacilityFetching implements IMedicalFacilityFetchStrategy {
  async fetch(req: Request|any): Promise<any> {
    const medicalFacilityId = req.params.medicalFacilityId
    return await MedicalFacility.findById(medicalFacilityId).populate({
      path: "auth",
      select: "email",
    }).populate({
      path:"location",
    }).populate({
      path:"workSchedule"
    })
  }
}
