import mongoose from "mongoose";
import { MedicalFacility } from "../../models/medicalFacility.model";
import { Location } from "../../models/Location.model";
import HttpResponse from "../../utils/HttpResponse";
import { IMedicalFacilityUpdatingCommand } from "../../types/IMedicalFacilityUpdatingCommand";

export class UpdateLocationCommand implements IMedicalFacilityUpdatingCommand {
  private city: string;
  private address: string;
  private coordinates: [number,number];
  private locationId: mongoose.Types.ObjectId;
  private suburb?: string;

  constructor(
    city: string,
    address: string,
    coordinates: [number,number],
    locationId: mongoose.Types.ObjectId,
    suburb?: string
  ) {
    this.city = city;
    this.address = address;
    this.coordinates = coordinates;
    this.locationId = locationId;
    this.suburb = suburb;
  }

  public async execute(): Promise<any> {

    const location = await Location.findById(this.locationId);
    if (!location) {
      return HttpResponse.NotFound("Location not found.");
    }

    if (this.city) location.city = this.city;
    if (this.suburb) location.suburb = this.suburb;
    if (this.address) location.address = this.address;
    if (this.coordinates) location.coordinates = this.coordinates;

    await location.save();

    return HttpResponse.Ok(location);
  }
}
