import { check } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const createAppointmentValidator = [
  check('doctorId')
    .notEmpty()
    .withMessage('Doctor ID is required')
    .isMongoId()
    .withMessage('Doctor ID must be a valid MongoDB ObjectId'),

  check('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be in valid ISO 8601 format')
    .custom((value) => {
      const currentDate = new Date();
      const appointmentDate = new Date(value);
      // If the appointment date is before today, throw an error
      if (appointmentDate < currentDate) {
        throw new Error('Appointment date must be today or in the future');
      }
      return true;
    }),

  check('time')
    .notEmpty()
    .withMessage('Time is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d) (AM|PM)$/)
    .withMessage('Time must be in HH:mm AM/PM format'),

  validatorMiddleware,
];
