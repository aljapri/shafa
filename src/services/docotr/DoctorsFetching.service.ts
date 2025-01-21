import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { IDoctorFetchStrategy } from '../../types/IDoctorFetchStrategy';
import { DoctorSearchQuery } from '../../utils/DoctorSearchQuery';

export class DoctorsFetching extends BaseFetchStrategy implements IDoctorFetchStrategy {
  public async fetch(req: Request | any): Promise<any> {
    const { search, specialization } = req.query;

    // Build the search query using DoctorSearchQuery
    const searchQuery = DoctorSearchQuery(search);

    // Start building the base query
    let baseQuery = Doctor.find(searchQuery)
      .populate({
        path: 'location',
        select: 'address city suburb',
      })
      .populate({
        path: 'workSchedule',
      })
      .select('-auth');

    // If a specialization is provided, add it to the query
    if (specialization) {
      baseQuery = baseQuery.where('specialization').equals(specialization);
    }

    // Use BaseFetchStrategy's applyAPIFeatures method to handle sorting, limiting fields, and pagination
    const features = this.applyAPIFeatures(baseQuery, req.query);
    const paginationResult = await features;

    return paginationResult;
  }
}