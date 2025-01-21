"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
const appError_1 = __importDefault(require("./appError"));
/**
 * Middleware to restrict access to specific roles.
 * @param roles - List of roles allowed to access the route.
 * @returns A middleware function.
 */
const restrictTo = (...roles) => {
    return (req, res, next) => {
        // Ensure the user role exists and is authorized
        if (!roles.includes(req.role)) {
            return next(new appError_1.default('You do not have permission to perform this action', 403));
        }
        next();
    };
};
exports.restrictTo = restrictTo;
