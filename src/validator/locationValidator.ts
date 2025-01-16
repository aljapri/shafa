import { check, body } from 'express-validator';
import mongoose from 'mongoose';
import validatorMiddleware from '../middleware/validator.middleware';

// Utility to check if a value is a valid MongoDB ObjectId

// Validator for the provided object
export const locationValidator = [
    check('location')
        .notEmpty()
        .withMessage('Location is required')
        .custom((location) => {
            if (typeof location !== 'object' || !location) {
                throw new Error('Location must be an object');
            }

            const { city, suburb, address, coordinates } = location;

            // Validate city
            if (!city || typeof city !== 'string') {
                throw new Error('City is required and must be a string');
            }

            // Validate suburb (optional)
            if (suburb && typeof suburb !== 'string') {
                throw new Error('Suburb must be a string');
            }

            // Validate address
            if (!address || typeof address !== 'string') {
                throw new Error('Address is required and must be a string');
            }

            // Validate coordinates
            if (!Array.isArray(coordinates) || coordinates.length !== 2) {
                throw new Error('Coordinates must be an array with [latitude, longitude]');
            }

            const [latitude, longitude] = coordinates;

            // Validate latitude
            if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
                throw new Error('Latitude must be a number between -90 and 90');
            }

            // Validate longitude
            if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
                throw new Error('Longitude must be a number between -180 and 180');
            }

            return true;
        }),


    validatorMiddleware,
];
