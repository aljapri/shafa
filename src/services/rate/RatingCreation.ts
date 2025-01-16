import { Types } from 'mongoose';
import { Rating } from '../../models/Rating.model';
import { Patient } from '../../models/Patient.model';
import { Doctor } from '../../models/Doctor.model';
import HttpResponse from '../../utils/HttpResponse';
import IFeedbackCreationCommand from '../../types/IFeedbackCreationCommand';

class RatingCreation implements IFeedbackCreationCommand {
  private doctorId: Types.ObjectId;
  private patientId: Types.ObjectId;
  private ratingValue: number;
  private isActive: boolean;

  /**
   * Constructor for initializing RatingCreation with necessary parameters.
   * @param doctorId - The ID of the doctor
   * @param patientId - The ID of the patient
   * @param ratingValue - The rating value (1-5)
   * @param isActive - Status of the rating (active or not)
   */
  constructor(
    doctorId: Types.ObjectId,
    patientId: Types.ObjectId,
    ratingValue: number,
    isActive: boolean = true
  ) {
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.ratingValue = ratingValue;
    this.isActive = isActive;
  }

  /**
   * Creates a rating after validation.
   */
  public async execute(): Promise<any> {
    // Validate patient
    const patient = await Patient.findById(this.patientId);
    if (!patient) {
      throw HttpResponse.NotFound('Patient not found.');
    }

    // Validate doctor
    const doctor = await Doctor.findById(this.doctorId);
    if (!doctor) {
      throw HttpResponse.NotFound('Doctor not found.');
    }

    // Create the rating
    const rating = await Rating.create({
      doctor: this.doctorId,
      patient: this.patientId,
      rating: this.ratingValue,
      isActive: this.isActive,
    });

    return HttpResponse.Ok(rating);
  }
}

export default RatingCreation;