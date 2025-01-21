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
exports.loginValidator = exports.signupValidator = void 0;
const express_validator_1 = require("express-validator");
const Auth_model_1 = require("../models/Auth.model");
const validator_middleware_1 = __importDefault(require("../middleware/validator.middleware"));
const HttpResponse_1 = __importDefault(require("../utils/HttpResponse"));
exports.signupValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const existingAuth = yield Auth_model_1.Auth.findOne({ email: val });
        if (existingAuth) {
            throw HttpResponse_1.default.NotFound("Email is already take");
        }
    })),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .custom((password, { req }) => {
        if (password !== req.body.passwordConfirm) {
            throw new Error('Password confirmation incorrect');
        }
        return true;
    }),
    (0, express_validator_1.check)('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),
    validator_middleware_1.default,
];
exports.loginValidator = [
    (0, express_validator_1.check)('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address'),
    (0, express_validator_1.check)('password')
        .notEmpty()
        .withMessage('Password required'),
    validator_middleware_1.default,
];
