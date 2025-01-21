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
const Location_model_1 = require("../../models/Location.model");
class LocationCreationService {
    createLocation(locationData, session) {
        return __awaiter(this, void 0, void 0, function* () {
            const { city, suburb, address, coordinates } = locationData;
            const location = yield Location_model_1.Location.create([{ city, suburb, address, coordinates }], { session });
            return location[0];
        });
    }
}
exports.default = LocationCreationService;
