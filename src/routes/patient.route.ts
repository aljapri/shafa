import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';
import Authorize from '../middleware/Authorize.middleware';
import JWTService from '../services/jwt/jwt.service';

import { restrictTo } from '../utils/restrictTo';
import { Patient } from '../models/Patient.model';
import PatientController from '../controllers/PatientController';
import { patientValidator } from '../validator/patientValidator';
import { loginValidator, signupValidator } from '../validator/authValidator';
import { updateEmailValidator } from '../validator/updateEmailValidator';
import { updatePasswordValidator } from '../validator/updatePasswordValidator';
import appointmentRoutes from './appointment.route';

import { setPhotoField, upload } from '../middleware/MulterHandler';
import { updatePatientValidator } from '../validator/updatePatientValidator';
import ratingRoutes from './rating.route';

const patientRoutes: Router = express.Router({ mergeParams: true });

// Authorization middleware setup
const authorization = new Authorize(new JWTService(), Patient);
const patientController = new PatientController();
patientRoutes.use("/appointmnets",authorization.authorize,appointmentRoutes)
patientRoutes.use("/ratings",authorization.authorize,ratingRoutes)
// Define routes
patientRoutes.post(
  '/',
  upload.single('photo'),
  setPhotoField,
  signupValidator,
  patientValidator,
  asyncWrapper( patientController.createAccount.bind(patientController))
);

patientRoutes.post(
  '/login',
  loginValidator,
  asyncWrapper( patientController.login.bind(patientController))
);

// Protect the routes below with authorization middleware
patientRoutes.use(authorization.authorize);
patientRoutes.use(restrictTo("patient"));

patientRoutes.patch(
  '/update-email',
  updateEmailValidator,
  asyncWrapper(patientController.updatingEmail.bind(patientController))
);


patientRoutes.patch(
  '/update-information',
  upload.single('photo'),
  setPhotoField,
  updatePatientValidator,
  asyncWrapper(patientController.updatingInformation.bind(patientController))
);

patientRoutes.patch(
  '/update-password',
  updatePasswordValidator,
  asyncWrapper(patientController.updatingPassword.bind(patientController))
);


// ---------------------------------------- appointmnets --------------------------------------------------



export default patientRoutes;
