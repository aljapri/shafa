import { Schema, model } from 'mongoose';

interface IWorkSchedule {
  sunday: {startTime:string,endTime:string,isAvailable:boolean};
  monday: {startTime:string,endTime:string,isAvailable:boolean};
  tuesday: {startTime:string,endTime:string,isAvailable:boolean};
  wednesday: {startTime:string,endTime:string,isAvailable:boolean};
  thursday: {startTime:string,endTime:string,isAvailable:boolean};
  friday: {startTime:string,endTime:string,isAvailable:boolean};
  saturday: {startTime:string,endTime:string,isAvailable:boolean};


}

const workScheduleSchema = new Schema<IWorkSchedule>({
  sunday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  monday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  tuesday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  wednesday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  thursday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },

  friday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
  saturday: { 
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: false },
  },
},
{
  timestamps: true, // Automatically add `createdAt` and `updatedAt`
});


const WorkSchedule = model<IWorkSchedule>('WorkSchedule', workScheduleSchema);

export { WorkSchedule, IWorkSchedule };
