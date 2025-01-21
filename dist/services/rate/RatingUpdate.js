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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rating_model_1 = require("../../models/Rating.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class RatingUpdate {
    constructor(patientId, newRating, ratingId) {
        this.patientId = patientId;
        this.newRating = newRating;
        this.ratingId = ratingId;
    }
    /**
     * Updates the rating.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const rating = yield Rating_model_1.Rating.findOne({ patient: this.patientId, _id: this.ratingId });
            if (!rating) {
                throw HttpResponse_1.default.NotFound('Comment not found.');
            }
            // Set isActive to false
            rating.rating = this.newRating;
            yield rating.save();
            return HttpResponse_1.default.Ok(rating);
        });
    }
}
exports.default = RatingUpdate;
