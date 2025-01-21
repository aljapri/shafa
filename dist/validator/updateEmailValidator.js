"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmailValidator = void 0;
const express_validator_1 = require("express-validator");
const Auth_model_1 = require("../models/Auth.model"); // Adjust the path based on your project structure
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
exports.updateEmailValidator = [
    (0, express_validator_1.check)('newEmail')
        .notEmpty()
        .withMessage('New email is required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((newEmail) => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = yield Auth_model_1.Auth.findOne({ email: newEmail });
        if (existingUser) {
            throw new Error('Email is already in use');
        }
        return true;
    })),
    validator_middleware_1.default,
];
