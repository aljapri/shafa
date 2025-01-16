import { Types } from 'mongoose';
import { Appointment } from '../../models/Appointment.model';
import { AppointmentDetails } from '../../models/AppointmentDetails.model';
import HttpResponse from '../../utils/HttpResponse';
import { IAppointmentCommand } from '../../types/IAppointmentCommand';
import AppError from '../../utils/appError';

export default class AppointmentCompleting implements IAppointmentCommand {
    private appointmentId: string;
    private doctorId: string;
    private diagnosis: string;
    private medication: string;
    private notes: string;

    constructor(
        appointmentId: string,
        doctorId: string,
        diagnosis: string,
        medication: string,
        notes: string,
    ) {
        this.appointmentId = appointmentId;
        this.doctorId = doctorId;
        this.diagnosis = diagnosis;
        this.medication = medication;
        this.notes = notes;
    }

    /**
     * Mark an appointment as completed by the doctor and add details
     */
    public async execute(): Promise<any> {
        // Validate ObjectIds

        // Start a transaction
        const session = await Appointment.startSession();

        try {
            // Start the transaction explicitly
            session.startTransaction();

            // Log the appointmentId and doctorId to check their values
            
            // Find the appointment by ID and verify that it belongs to the doctor
            const appointment = await Appointment.findOne({
                _id: this.appointmentId,
                doctor: this.doctorId,
                status: 'booked',
            }).session(session); // Ensure to run this query in the session
            // Log the result of the query
            if (!appointment) {
                throw HttpResponse.NotFound('Appointment not found or not accessible.');
            }

            // Update the appointment status to 'completed'
            appointment.status = 'completed';
            await appointment.save({ session }); // Ensure to save within the transaction

            // Create the appointment details
            const appointmentDetails = await AppointmentDetails.create([{
                appointment: this.appointmentId,
                diagnosis: this.diagnosis,
                medication: this.medication,
                notes: this.notes,
            }], { session }); // Ensure to create appointment details within the transaction

            // Commit the transaction
            await session.commitTransaction();

            return HttpResponse.Ok({
                appointment,
                appointmentDetails,
            });
            
        } catch (error) {
            // Rollback the transaction in case of an error
            await session.abortTransaction();
            throw error;
        } finally {
            // End the session
            session.endSession();
        }
    }
}
