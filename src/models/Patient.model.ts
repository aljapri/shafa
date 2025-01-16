import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IPatient extends Document {
  firstName: string;
  lastName: string;
  phone: string;
  photo: string;
  auth: mongoose.Types.ObjectId;  // Reference to Auth model

}

const patientSchema = new Schema<IPatient>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  photo: { type: String, default: 'user.jpg', required: true },  // Default photo
  auth: { type: Schema.Types.ObjectId, ref: 'Auth', required: true }, // Reference to Auth model
},

{ timestamps: true } 
);

const Patient = model<any>('Patient', patientSchema);

export { Patient, IPatient };
