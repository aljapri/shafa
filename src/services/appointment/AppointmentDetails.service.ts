import { NextFunction, Request, Response } from 'express';
import { Doctor } from '../../models/Doctor.model';
import { Appointment } from '../../models/Appointment.model';
import { IAppointmentFetchStrategy } from '../../types/IAppointmentFetchStrategy';
import HttpResponse from '../../utils/HttpResponse';
import { AppointmentDetails } from '../../models/AppointmentDetails.model';

export default class AppointmentDetailsFetching implements IAppointmentFetchStrategy {
  public async fetch(req: Request | any): Promise<void|any> {
    const appointmentId = req.params.appointmentId;
    const queryConditions:any = {_id: appointmentId,status:"completed"};
    if (req.role == "doctor") {
        queryConditions.doctor = req.accountId;
    } else if (req.role == "patient") {
        queryConditions.patient = req.accountId
    } else {
        throw HttpResponse.Forbidden('Invalid owner type. Specify if the ID belongs to a patient or a doctor.');
    }
    // console.log(queryConditions);
    // Base query to filter by medicalFacilityId
    let appointment = await Appointment.findOne(queryConditions);
    if(!appointment){
        throw HttpResponse.NotFound("there are no appointmnet");
    }
    const appointmentDetails = await AppointmentDetails.findOne({appointment:appointment._id}).populate("appointment");
    if(!appointmentDetails){
        throw HttpResponse.NotFound("there are no appointmnet Deails");
    }
    return appointmentDetails;
  }
}