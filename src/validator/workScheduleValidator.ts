import { check, body } from 'express-validator';
import validatorMiddleware from '../middleware/validator.middleware';

export const workScheduleValidator = [
  check('workSchedule')
    .notEmpty()
    .withMessage('Work Schedule is required')
    .isObject()
    .withMessage('Work Schedule must be an object'),

  // Ensure work schedule covers all days from Sunday to Saturday in lowercase
  body('workSchedule.sunday.startTime') // Change "Sunday" to lowercase
    .notEmpty()
    .withMessage('Start time for sunday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.sunday.endTime') // Change "Sunday" to lowercase
    .notEmpty()
    .withMessage('End time for sunday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.sunday.isAvailable') // Change "Sunday" to lowercase
    .notEmpty()
    .withMessage('Availability for sunday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  // Repeat for Monday through Saturday (all lowercase)
  body('workSchedule.monday.startTime') // Change "Monday" to lowercase
    .notEmpty()
    .withMessage('Start time for monday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.monday.endTime') // Change "Monday" to lowercase
    .notEmpty()
    .withMessage('End time for monday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.monday.isAvailable') // Change "Monday" to lowercase
    .notEmpty()
    .withMessage('Availability for monday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.tuesday.startTime') // Change "Tuesday" to lowercase
    .notEmpty()
    .withMessage('Start time for tuesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.tuesday.endTime') // Change "Tuesday" to lowercase
    .notEmpty()
    .withMessage('End time for tuesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.tuesday.isAvailable') // Change "Tuesday" to lowercase
    .notEmpty()
    .withMessage('Availability for tuesday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.wednesday.startTime') // Change "Wednesday" to lowercase
    .notEmpty()
    .withMessage('Start time for wednesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.wednesday.endTime') // Change "Wednesday" to lowercase
    .notEmpty()
    .withMessage('End time for wednesday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.wednesday.isAvailable') // Change "Wednesday" to lowercase
    .notEmpty()
    .withMessage('Availability for wednesday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.thursday.startTime') // Change "Thursday" to lowercase
    .notEmpty()
    .withMessage('Start time for thursday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.thursday.endTime') // Change "Thursday" to lowercase
    .notEmpty()
    .withMessage('End time for thursday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.thursday.isAvailable') // Change "Thursday" to lowercase
    .notEmpty()
    .withMessage('Availability for thursday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.friday.startTime') // Change "Friday" to lowercase
    .notEmpty()
    .withMessage('Start time for friday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.friday.endTime') // Change "Friday" to lowercase
    .notEmpty()
    .withMessage('End time for friday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.friday.isAvailable') // Change "Friday" to lowercase
    .notEmpty()
    .withMessage('Availability for friday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  body('workSchedule.saturday.startTime') // Change "Saturday" to lowercase
    .notEmpty()
    .withMessage('Start time for saturday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Start time must be in HH:mm format'),

  body('workSchedule.saturday.endTime') // Change "Saturday" to lowercase
    .notEmpty()
    .withMessage('End time for saturday is required')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('End time must be in HH:mm format'),

  body('workSchedule.saturday.isAvailable') // Change "Saturday" to lowercase
    .notEmpty()
    .withMessage('Availability for saturday is required')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  validatorMiddleware,
];
