import { Request } from 'express';
import { Doctor } from '../../models/Doctor.model';
import APIFeatures from '../../utils/ApiFeatures';
import { MedicalFacility } from '../../models/medicalFacility.model';
import { IMedicalFacilityFetchStrategy } from '../../types/IMedicalFacilityFetchStrategy';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';
import { MedicalFacilitySearchQuery } from '../../utils/MedicalFacilitySearchQuery';
export class MedicalFacilitiesFetching extends BaseFetchStrategy implements IMedicalFacilityFetchStrategy {
  async fetch(req: Request | any): Promise<any> {
    const { random, limit, search, medicalFacilityType } = req.query;

    if (random) {
      // If 'random' is set in the query, fetch a random sample of medical facilities
      const randomLimit = parseInt(limit) || 10; // Default to 1 random facility
      console.log(limit);
      return await MedicalFacility.aggregate([
        {
          $match: medicalFacilityType ? { medicalFacilityType } : {}, // Filter by medicalFacilityType if provided
        },
        { $sample: { size: randomLimit } }, // Random sampling
        {
          $lookup: {
            from: 'locations',
            localField: 'location',
            foreignField: '_id',
            as: 'locationDetails',
          },
        },
        {
          $lookup: {
            from: 'workschedules',
            localField: 'workSchedule',
            foreignField: '_id',
            as: 'workScheduleDetails',
          },
        },
        {
          $project: {
            auth: 0, // Exclude the 'auth' field
          },
        },
      ]);
    } else {
      // Build search terms including medicalFacilityType if provided
      const searchTerms = {
        ...MedicalFacilitySearchQuery(search),
        ...(medicalFacilityType ? { medicalFacilityType } : {}), // Add medicalFacilityType to the search query if provided
      };

      let baseQuery = MedicalFacility.find(searchTerms)
        .populate({
          path: 'location',
          select: 'address city suburb',
        })
        .populate({
          path: 'workSchedule',
        })
        .select('-auth');

      return await this.applyAPIFeatures(baseQuery, req.query);
    }
  }
}
