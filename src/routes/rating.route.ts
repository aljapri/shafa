import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';


import { createAppointmentValidator } from '../validator/appointmentValidator';
import RateController from '../controllers/RateController';

const ratingRoutes: Router = express.Router({ mergeParams: true });
const rateController = new RateController();

// Authorization middleware setup





ratingRoutes.post(
  '/',
  asyncWrapper(rateController.createRating.bind(rateController))
);

ratingRoutes.patch(
  '/:ratingId',
  asyncWrapper(rateController.updateRating.bind(rateController))
);




  

  export default ratingRoutes;
