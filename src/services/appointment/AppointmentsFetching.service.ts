import { Request } from 'express';
import { Appointment } from '../../models/Appointment.model';
import { IAppointmentFetchStrategy } from '../../types/IAppointmentFetchStrategy';
import { BaseFetchStrategy } from '../../utils/BaseFetchStrategy';

export default class AppointmentsFetching extends BaseFetchStrategy implements IAppointmentFetchStrategy {
  /**
   * Fetch appointments based on the owner (patient or doctor) and optional date filters.
   * @param req - The request object containing the owner ID and query parameters.
   * @returns Promise containing the fetched appointments.
   */
  public async fetch(req: Request | any): Promise<any> {
    const ownerId = req.accountId; // Owner ID (can be a patient or doctor ID)
    const queryDate = req.query.date ? new Date(req.query.date) : new Date();
    const status = req.query.status;
    const date = req.query.date;

    // Get the beginning and end of the specified day
    const startOfDay = new Date(queryDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(queryDate);
    endOfDay.setUTCHours(0, 0, 0, 0);
    endOfDay.setDate(queryDate.getDate() + 1);

    // Determine whether the ID is for a patient or doctor and build the query conditions
    const queryConditions: any = {};
    if (date) {
      queryConditions.date = { $gte: startOfDay, $lt: endOfDay };
    }

    if (status) {
      queryConditions.status = status;
    }

    // Check if the role is doctor or patient and build conditions
    if (req.role === 'doctor') {
      queryConditions.doctor = ownerId;
    } else if (req.role === 'patient') {
      queryConditions.patient = ownerId;
    } else {
      throw new Error('Invalid owner type. Specify if the ID belongs to a patient or a doctor.');
    }

    // Build and execute the query with API features (pagination, filtering, etc.)
    const baseQuery = Appointment.find(queryConditions)
      .populate('patient', 'firstName lastName') // Populate patient fields
      .populate('doctor', 'firstName lastName specialization'); // Populate doctor fields

    // Use BaseFetchStrategy's applyAPIFeatures method to handle sorting, limiting fields, and pagination
    const features = this.applyAPIFeatures(baseQuery, req.query);
    const paginationResult = await features;

    return paginationResult;
  }
}