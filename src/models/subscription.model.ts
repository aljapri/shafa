import mongoose, { Schema, model, Document, Model } from 'mongoose';
import { ISubscriptionPlan } from './subscriptionPlan.model'; // Import SubscriptionPlan interface
import { IMedicalFacility } from './medicalFacility.model'; // Import MedicalFacility interface

interface ISubscription extends Document {
  auth: mongoose.Types.ObjectId; // Reference to the MedicalFacility collection
  subscriptionPlan: mongoose.Types.ObjectId; // Reference to the SubscriptionPlan collection
  startDate: Date; // Start date of the subscription
  endDate: Date; // End date of the subscription
  status: 'Active' | 'Expired' | 'Inactive'; // Subscription status
}

const subscriptionSchema: Schema<ISubscription> = new Schema(
  {
    auth: { 
      type: Schema.Types.ObjectId, 
      ref: 'Auth', 
      required: true 
    },
    subscriptionPlan: { 
      type: Schema.Types.ObjectId, 
      ref: 'SubscriptionPlan', 
      required: true 
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { 
      type: String, 
      enum: ['Active', 'Expired', 'Inactive'], 
      default: 'Active' 
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt`
  }
);

const Subscription: Model<ISubscription> = model<ISubscription>(
  'Subscription',
  subscriptionSchema
);

export { Subscription, ISubscription };
