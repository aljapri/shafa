import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';


import AppointmentController from '../controllers/AppointmentController';
import { createAppointmentValidator } from '../validator/appointmentValidator';
import { completeAppointmentValidation } from '../validator/completeAppointmnetValidator';

const appointmentRoutes: Router = express.Router({ mergeParams: true });
const appointmentController = new AppointmentController();

// Authorization middleware setup



appointmentRoutes.get(
  '/',
  asyncWrapper(appointmentController.fetchAppointments.bind(appointmentController))
);

appointmentRoutes.post(
  '/',
  createAppointmentValidator,
  asyncWrapper(appointmentController.createAppointment.bind(appointmentController))
);

appointmentRoutes.get(
  '/:appointmentId',
  asyncWrapper(appointmentController.fetchAppointment.bind(appointmentController))
);

appointmentRoutes.post(
  '/:appointmentId/complete',
  completeAppointmentValidation,
  asyncWrapper(appointmentController.completeAppointment.bind(appointmentController))
);

appointmentRoutes.patch(
  '/:appointmentId/cancel',
  asyncWrapper(appointmentController.cancelAppointment.bind(appointmentController))
);
appointmentRoutes.get(
  '/:appointmentId/detail',
  asyncWrapper(appointmentController.fetchAppointmentDetails.bind(appointmentController))
);
  


  

  export default appointmentRoutes;
