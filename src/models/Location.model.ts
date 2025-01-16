import mongoose, { Schema } from "mongoose";

export interface ILocation extends Document {
    city: string;
    suburb?: string;
    address: string;
    coordinates:  [number, number]; // URL or GPS coordinates
  }
  
  const locationSchema = new Schema<ILocation>({
    city: { type: String, required: true },
    suburb: { type: String,default: "" },
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true }, // e.g., Google Maps URL or GPS
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  });
  
  export const Location = mongoose.model<ILocation>('Location', locationSchema);
  