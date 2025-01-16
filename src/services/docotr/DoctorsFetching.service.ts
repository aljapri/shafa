import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { IDoctorFetchStrategy } from '../../types/IDoctorFetchStrategy';
import { DoctorSearchQuery } from '../../utils/DoctorSearchQuery';

export class DoctorsFetching extends BaseFetchStrategy implements IDoctorFetchStrategy {
  public async fetch(req: Request | any): Promise<any> {
    const searchQuery = DoctorSearchQuery(req.query.search);
    const { specialization } = req.query;
    
    // Start building the query
    let baseQuery = Doctor.find(searchQuery).populate({
      path: "location",
      select: "address city suburb"
    }).populate({
      path: "workSchedule"
    }).select("-auth");
    
    // If a specialization is provided, add it to the query
    if (specialization) {
      baseQuery = baseQuery.where('specialization').equals(specialization);
    }
    
    // Apply API features (pagination, sorting, etc.)
    return await this.applyAPIFeatures(baseQuery, req.query);
  }
}
