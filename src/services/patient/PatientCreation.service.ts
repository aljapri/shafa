import mongoose, { ClientSession } from "mongoose";
import { Patient } from "../../models/Patient.model";
import HttpResponse from "../../utils/HttpResponse";

export default class PatientCreationService {
  /**
   * Create a patient record
   */
  public async create(
    body: any,
    authId: mongoose.Types.ObjectId,
    session: ClientSession
  ) {
    const { firstName, lastName, phone, photo } = body;

    try {
      // Create a new patient record
      const patient = await Patient.create(
        [
          {
            firstName,
            lastName,
            phone,
            photo, // The uploaded photo filename is saved here
            auth: authId,
          },
        ],
        { session }
      );

      return patient[0]; // Return the created patient record
    } catch (error) {
      throw HttpResponse.InternalServerError;
    }
  }
}
