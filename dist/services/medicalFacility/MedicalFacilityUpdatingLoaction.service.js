"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLocationCommand = void 0;
const medicalFacility_model_1 = require("../../models/medicalFacility.model");
const Location_model_1 = require("../../models/Location.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class UpdateLocationCommand {
    constructor(city, address, coordinates, accountId, suburb) {
        this.city = city;
        this.address = address;
        this.coordinates = coordinates;
        this.accountId = accountId;
        this.suburb = suburb;
    }
    async execute() {
        const document = await medicalFacility_model_1.MedicalFacility.findById(this.accountId);
        if (!document) {
            return HttpResponse_1.default.NotFound("Medical facility not found.");
        }
        const location = await Location_model_1.Location.findById(document.location);
        if (!location) {
            return HttpResponse_1.default.NotFound("Location not found.");
        }
        if (this.city)
            location.city = this.city;
        if (this.suburb)
            location.suburb = this.suburb;
        if (this.address)
            location.address = this.address;
        if (this.coordinates)
            location.coordinates = this.coordinates;
        await location.save();
        return HttpResponse_1.default.Ok(location);
    }
}
exports.UpdateLocationCommand = UpdateLocationCommand;
