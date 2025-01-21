import { Request } from 'express';
import { MedicalFacility } from '../../models/medicalFacility.model';
import { IMedicalFacilityFetchStrategy } from '../../types/IMedicalFacilityFetchStrategy';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { MedicalFacilitySearchQuery } from '../../utils/MedicalFacilitySearchQuery';

export class MedicalFacilitiesFetching extends BaseFetchStrategy implements IMedicalFacilityFetchStrategy {
  async fetch(req: Request | any): Promise<any> {
    const { random, search, medicalFacilityType, excludeMedicalFacilityType, city } = req.query;

    if (random) {
      // If 'random' is set in the query, fetch a random sample of medical facilities
      const randomLimit = parseInt(req.query.limit) || 10; // Default to 10 random facilities
      return await MedicalFacility.aggregate([
        {
          $match: {
            ...(medicalFacilityType ? { medicalFacilityType } : {}), // Filter by medicalFacilityType if provided
            ...(excludeMedicalFacilityType ? { medicalFacilityType: { $ne: excludeMedicalFacilityType } } : {}), // Exclude medicalFacilityType if provided
            ...(city ? { 'location.city': new RegExp(city, 'i') } : {}), // Filter by city if provided
          },
        },
        { $sample: { size: randomLimit } }, // Random sampling
        {
          $lookup: {
            from: 'locations',
            localField: 'location',
            foreignField: '_id',
            as: 'location',
          },
        },
        {
          $lookup: {
            from: 'workschedules',
            localField: 'workSchedule',
            foreignField: '_id',
            as: 'workSchedule',
          },
        },
        {
          $project: {
            auth: 0, // Exclude the 'auth' field
          },
        },
      ]);
    } else {
      // Build search terms including medicalFacilityType, excludeMedicalFacilityType, and city if provided
      const searchTerms = {
        ...MedicalFacilitySearchQuery(search),
        ...(medicalFacilityType ? { medicalFacilityType } : {}), // Add medicalFacilityType to the search query if provided
        ...(excludeMedicalFacilityType ? { medicalFacilityType: { $ne: excludeMedicalFacilityType } } : {}), // Exclude medicalFacilityType if provided
        ...(city ? { 'location.city': new RegExp(city, 'i') } : {}), // Filter by city if provided
      };

      // Log the search terms for debugging

      // Start building the query
      let baseQuery = MedicalFacility.find(searchTerms)
        .populate({
          path: 'location',
          select: 'address city suburb',
        })
        .populate({
          path: 'workSchedule',
        })
        .select('-auth');

      // Use BaseFetchStrategy's applyAPIFeatures method to handle sorting, limiting fields, and pagination
      const features = this.applyAPIFeatures(baseQuery, req.query);
      const paginationResult = await features;

      return paginationResult;
    }
  }
}