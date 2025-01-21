import mongoose, { Schema } from "mongoose";

interface IAuth extends Document {
    email: string;
    password: string;
    passwordChangedAt?: Date;
    role:"admin" | "patient" | "docotr" | "medicalFacility";
    isActive:boolean;
  }
  
  const authSchema = new Schema<IAuth>({
    email: { type: String, required: true, unique: true },  // Unique constraint on email
    password: { type: String, required: true },
    passwordChangedAt: { type: Date },
    role:{
      type:String,
      enum:["admin","patient","doctor","medicalFacility"]
    },
    isActive:{type:Boolean, default:true}
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }); // Explicitly set the collection name
  
  export const Auth = mongoose.model<IAuth>('Auth', authSchema);