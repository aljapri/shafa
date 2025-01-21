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
const FeedbackCommandInvoker_copy_1 = require("../command/FeedbackCommandInvoker copy");
const RatingCreation_1 = __importDefault(require("../services/rate/RatingCreation"));
const RatingUpdate_1 = __importDefault(require("../services/rate/RatingUpdate"));
class RateController {
    constructor() {
    }
    createRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { doctorId, rating } = req.body;
            const patientId = req.accountId;
            const command = new RatingCreation_1.default(doctorId, patientId, rating);
            const result = yield FeedbackCommandInvoker_copy_1.FeedbackCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updateRating(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params.commentId;
            const patientId = req.accountId;
            const { newRating } = req.body;
            const command = new RatingUpdate_1.default(patientId, commentId, newRating);
            const result = yield FeedbackCommandInvoker_copy_1.FeedbackCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
}
exports.default = RateController;
