"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalFacilitySearchQuery = void 0;
const MedicalFacilitySearchQuery = (search) => {
    if (!search)
        return {};
    // Split the search term into individual words and create a regex for each word
    const searchTerms = search.split(' ').map(term => new RegExp(term, 'i'));
    return {
        $or: [
            { name: { $in: searchTerms } }, // Search for partial matches in the name field
            { 'location.city': { $in: searchTerms } }, // Search for partial matches in the city field
        ],
    };
};
exports.MedicalFacilitySearchQuery = MedicalFacilitySearchQuery;
