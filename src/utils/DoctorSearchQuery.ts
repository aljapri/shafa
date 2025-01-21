import { FilterQuery } from 'mongoose';
import { Doctor } from '../models/Doctor.model';

export const DoctorSearchQuery = (search: string): FilterQuery<typeof Doctor> => {
  if (!search) return {};

  // Split the search term into individual words and create a regex for each word
  const searchTerms = search.split(' ').map(term => new RegExp(term, 'i'));

  return {
    $or: [
      { firstName: { $in: searchTerms } }, // Search by first name
      { lastName: { $in: searchTerms } }, // Search by last name
      { specialization: { $in: searchTerms } }, // Search by specialization
    ],
  };
};