import express, { Router } from 'express';
import asyncWrapper from '../utils/catchAsync';

import Authorize from '../middleware/Authorize.middleware';
import JWTService from '../services/jwt/jwt.service';
import DoctorController from '../controllers/DoctorController';
import { restrictTo } from '../utils/restrictTo';
import appointmentRoutes from './appointment.route';
import { doctorValidator } from '../validator/doctorValidator';
import { updateDoctorValidator } from '../validator/updateDocotrInformation';
import { updateWorkScheduleValidator } from '../validator/updateWorkSchedule';
import { setPhotoField, upload } from '../middleware/MulterHandler';
import { updateLocationValidator } from '../validator/updateLocationValidator';
import { updateEmailValidator } from '../validator/updateEmailValidator';
import { updatePasswordValidator } from '../validator/updatePasswordValidator';
import { loginValidator, signupValidator } from '../validator/authValidator';
import { locationValidator } from '../validator/locationValidator';
import { workScheduleValidator } from '../validator/workScheduleValidator';
import { Doctor } from '../models/Doctor.model';

const doctorRoutes: Router = express.Router({ mergeParams: true });
const doctorController = new DoctorController();

// Authorization middleware setup
const authorization = new Authorize(new JWTService(), Doctor);

doctorRoutes.use("/appointmnets", authorization.authorize, restrictTo("doctor"), appointmentRoutes)


doctorRoutes.post('/', doctorValidator, setPhotoField,
  signupValidator,
  doctorValidator,
  locationValidator,
  workScheduleValidator, asyncWrapper(doctorController.createAccount.bind(doctorController)))


doctorRoutes.post(
  '/login',
  loginValidator,
  asyncWrapper(doctorController.login.bind(doctorController))
);
doctorRoutes.get(
  '/',
  asyncWrapper(doctorController.fetchDoctors.bind(doctorController))
);
doctorRoutes.get(
  '/:doctorId',
  asyncWrapper(doctorController.fetchDoctor.bind(doctorController))
);


doctorRoutes.use(authorization.authorize);
doctorRoutes.use(restrictTo("doctor"))


doctorRoutes.patch(
  '/update-information',
  upload.single('photo'),
  setPhotoField,
  updateDoctorValidator,
  asyncWrapper(doctorController.updatingInformation.bind(doctorController))
);

doctorRoutes.patch(
  '/update-work-schedule',
  updateWorkScheduleValidator,
  asyncWrapper(doctorController.updatingWorkSchedule.bind(doctorController))
);

doctorRoutes.patch(
  '/update-location',
  updateLocationValidator,
  asyncWrapper(doctorController.updatingLocation.bind(doctorController))
);
doctorRoutes.patch(
  '/update-password',
  updatePasswordValidator,
  asyncWrapper(doctorController.updatingPassword.bind(doctorController))
);

doctorRoutes.patch(
  '/update-email',
  updateEmailValidator,
  asyncWrapper(doctorController.updatingEmail.bind(doctorRoutes))
);



export default doctorRoutes;
