import { Types } from 'mongoose';
import { Appointment } from '../../models/Appointment.model';
import { Patient } from '../../models/Patient.model';
import { Doctor } from '../../models/Doctor.model';
import HttpResponse from '../../utils/HttpResponse';
import { IAppointmentCommand } from '../../types/IAppointmentCommand';

class AppointmentCreation implements IAppointmentCommand {
  private doctorId: Types.ObjectId;
  private patientId: Types.ObjectId;
  private date: Date;
  private time: string;

  /**
   * Constructor for initializing AppointmentService with necessary parameters.
   * @param doctorId - The ID of the doctor
   * @param patientId - The ID of the patient
   * @param date - The date of the appointment
   * @param time - The time of the appointment
   */
  constructor(
    doctorId: Types.ObjectId,
    patientId: Types.ObjectId,
    date: Date,
    time: string
  ) {
    this.doctorId = doctorId;
    this.patientId = patientId;
    this.date = date;
    this.time = time;
  }

  /**
   * Creates an appointment after validation.
   */
  public async execute(): Promise<any> {
    // Validate patient
    const patient = await Patient.findById(this.patientId);
    if (!patient) {
      throw HttpResponse.NotFound('Patient not found.');
    }

    // Validate doctor and medical facility
    const doctor:any = await Doctor.findOne({ _id: this.doctorId }).populate({
      path: 'workSchedule',
    });
    if (!doctor) {
      throw HttpResponse.NotFound('Doctor not found.');
    }
    const inputDate = new Date(this.date); // This represents the date (January 13, 2025)
    
    
    // Get the day of the week from the date
    const dayOfWeek = inputDate.toLocaleString('en-us', { weekday: 'long' }).toLocaleLowerCase();
    // Check if the doctor has  availability for this day
    const workDay:any = doctor.workSchedule[dayOfWeek];
    if (!workDay || !workDay.isAvailable) {
      throw HttpResponse.Conflict('Doctor is not available on this day.');
    }

    // Check if the appointment time is within the doctor's working hours for that day
    const appointmentTime = this.time.split(' ')[0]; // Extract time from "HH:mm AM/PM"
    const [appointmentHour, appointmentMinute] = appointmentTime.split(':').map(Number);

    const [startHour, startMinute] = workDay.startTime.split(':').map(Number);
    const [endHour, endMinute] = workDay.endTime.split(':').map(Number);

    const startOfDay = new Date(this.date);
    startOfDay.setHours(startHour, startMinute, 0, 0);
    const endOfDay = new Date(this.date);
    endOfDay.setHours(endHour, endMinute, 0, 0);

    const appointmentDate = new Date(this.date);
    appointmentDate.setHours(appointmentHour, appointmentMinute, 0, 0);

    if (appointmentDate < startOfDay || appointmentDate > endOfDay) {
      throw HttpResponse.Conflict('The selected time is outside the doctor\'s working hours.');
    }

    // Check for conflicting appointments
    const conflict = await Appointment.findOne({
      doctor: this.doctorId,
      date: this.date,
      time: this.time,
      status: 'booked',
    });

    if (conflict) {
      throw HttpResponse.Conflict('The doctor is already booked for the selected time.');
    }

    // Create the appointment
    const appointment = await Appointment.create({
      patient: this.patientId,
      doctor: this.doctorId,
      date: this.date,
      time: this.time,
      status: 'booked',
    });

    return HttpResponse.Ok(appointment);
  }
}

export default AppointmentCreation;
