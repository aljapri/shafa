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
exports.DoctorsFetching = void 0;
const Doctor_model_1 = require("../../models/Doctor.model");
const BaseFetchStrategy_1 = require("../../utils/BaseFetchStrategy");
const DoctorSearchQuery_1 = require("../../utils/DoctorSearchQuery");
class DoctorsFetching extends BaseFetchStrategy_1.BaseFetchStrategy {
    fetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { search, specialization } = req.query;
            // Build the search query using DoctorSearchQuery
            const searchQuery = (0, DoctorSearchQuery_1.DoctorSearchQuery)(search);
            // Start building the base query
            let baseQuery = Doctor_model_1.Doctor.find(searchQuery)
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
            const paginationResult = yield features;
            return paginationResult;
        });
    }
}
exports.DoctorsFetching = DoctorsFetching;
