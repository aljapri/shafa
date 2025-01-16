import mongoose, { Schema, model, Document } from 'mongoose';

// Define the IDoctor interface extending Mongoose's Document
interface IDoctor extends Document {
  firstName: string;
  lastName: string;
  auth: mongoose.Types.ObjectId;
  phone: string;
  photo: string;
  specialization: string;
  workSchedule: mongoose.Types.ObjectId;
  maxPatients: number;
  gender: string;
  description: string;
  experience:number;
  location: mongoose.Types.ObjectId; // Reference to the Location model
}

// Define the schema for the Doctor model
const doctorSchema = new Schema<IDoctor>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    auth: { type: Schema.Types.ObjectId, ref: 'Auth', required: true }, // Reference to Auth model
    phone: { type: String, required: true },
    photo: { type: String, required: true },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    specialization: { type: String, required: true },
    location: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    workSchedule: { type: Schema.Types.ObjectId, ref: 'WorkSchedule' },
    maxPatients: { type: Number, required: true },
    description: { type: String, required: true },
    experience: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

// Create the Doctor model
const Doctor = model<IDoctor>('Doctor', doctorSchema);

export { Doctor, IDoctor };
