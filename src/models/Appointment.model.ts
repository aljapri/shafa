import mongoose, { Schema, model, Document } from 'mongoose';
import { IPatient } from './Patient.model';
import { IDoctor } from './Doctor.model';
import { IMedicalFacility } from './medicalFacility.model';

interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  date: Date;
  time: string;
  status: 'booked' | 'canceled' | 'completed' | 'expired';

}

const appointmentSchema = new Schema<IAppointment>({
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, enum: ['booked', 'canceled', 'completed','expired'], required: true,default:"booked" },
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});

const Appointment = model<IAppointment>('Appointment', appointmentSchema);

export { Appointment, IAppointment };