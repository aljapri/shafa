"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicalFacilitiesFetching = void 0;
const medicalFacility_model_1 = require("../../models/medicalFacility.model");
const BaseFetchStrategy_1 = require("../../utils/BaseFetchStrategy");
const MedicalFacilitySearchQuery_1 = require("../../utils/MedicalFacilitySearchQuery");
class MedicalFacilitiesFetching extends BaseFetchStrategy_1.BaseFetchStrategy {
    fetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { random, search, medicalFacilityType, excludeMedicalFacilityType, city } = req.query;
            if (random) {
                // If 'random' is set in the query, fetch a random sample of medical facilities
                const randomLimit = parseInt(req.query.limit) || 10; // Default to 10 random facilities
                return yield medicalFacility_model_1.MedicalFacility.aggregate([
                    {
                        $match: Object.assign(Object.assign(Object.assign({}, (medicalFacilityType ? { medicalFacilityType } : {})), (excludeMedicalFacilityType ? { medicalFacilityType: { $ne: excludeMedicalFacilityType } } : {})), (city ? { 'location.city': new RegExp(city, 'i') } : {})),
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
            }
            else {
                // Build search terms including medicalFacilityType, excludeMedicalFacilityType, and city if provided
                const searchTerms = Object.assign(Object.assign(Object.assign(Object.assign({}, (0, MedicalFacilitySearchQuery_1.MedicalFacilitySearchQuery)(search)), (medicalFacilityType ? { medicalFacilityType } : {})), (excludeMedicalFacilityType ? { medicalFacilityType: { $ne: excludeMedicalFacilityType } } : {})), (city ? { 'location.city': new RegExp(city, 'i') } : {}));
                // Log the search terms for debugging
                // Start building the query
                let baseQuery = medicalFacility_model_1.MedicalFacility.find(searchTerms)
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
                const paginationResult = yield features;
                return paginationResult;
            }
        });
    }
}
exports.MedicalFacilitiesFetching = MedicalFacilitiesFetching;
