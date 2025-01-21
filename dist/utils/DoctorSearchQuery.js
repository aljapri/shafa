"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorSearchQuery = void 0;
const DoctorSearchQuery = (search) => {
    if (!search)
        return {};
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
exports.DoctorSearchQuery = DoctorSearchQuery;
