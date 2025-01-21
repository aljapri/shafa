import { FilterQuery } from 'mongoose';
import { MedicalFacility } from '../models/medicalFacility.model';

export const MedicalFacilitySearchQuery = (search: string): FilterQuery<typeof MedicalFacility> => {
  if (!search) return {};

  // Split the search term into individual words and create a regex for each word
  const searchTerms = search.split(' ').map(term => new RegExp(term, 'i'));

  return {
    $or: [
      { name: { $in: searchTerms } }, // Search for partial matches in the name field
      { 'location.city': { $in: searchTerms } }, // Search for partial matches in the city field
    ],
  };
};