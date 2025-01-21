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
exports.UpdateLocationCommand = void 0;
const Location_model_1 = require("../../models/Location.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class UpdateLocationCommand {
    constructor(city, address, coordinates, locationId, suburb) {
        this.city = city;
        this.address = address;
        this.coordinates = coordinates;
        this.locationId = locationId;
        this.suburb = suburb;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield Location_model_1.Location.findById(this.locationId);
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
            yield location.save();
            return HttpResponse_1.default.Ok(location);
        });
    }
}
exports.UpdateLocationCommand = UpdateLocationCommand;
