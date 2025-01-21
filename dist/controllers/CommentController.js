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
const CommentCreation_1 = __importDefault(require("../services/comment/CommentCreation"));
const CommentDeleting_1 = __importDefault(require("../services/comment/CommentDeleting"));
const CommentUpdateing_1 = __importDefault(require("../services/comment/CommentUpdateing"));
const CommentFetchContext_1 = require("../strategy/CommentFetchContext");
const CommentsFetching_1 = require("../services/comment/CommentsFetching");
const CommentFetching_1 = require("../services/comment/CommentFetching");
class CommentController {
    constructor() {
    }
    createComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { doctorId, comment } = req.body;
            const patientId = req.accountId;
            const command = new CommentCreation_1.default(doctorId, patientId, comment);
            const result = yield FeedbackCommandInvoker_copy_1.FeedbackCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    deleteComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params.commentId;
            const patientId = req.accountId;
            const command = new CommentDeleting_1.default(commentId, patientId);
            const result = yield FeedbackCommandInvoker_copy_1.FeedbackCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    updateComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params.commentId;
            const patientId = req.accountId;
            const { newComment } = req.body;
            const command = new CommentUpdateing_1.default(patientId, commentId, newComment);
            const result = yield FeedbackCommandInvoker_copy_1.FeedbackCommandInvoker.executeCommand(command);
            res.status(result.statusCode).json(result);
        });
    }
    fetchComments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new CommentsFetching_1.CommentsFetching();
            const fetchContext = new CommentFetchContext_1.CommentFetchContext(strategy);
            yield fetchContext.handle(req, res, next);
        });
    }
    fetchComment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const strategy = new CommentFetching_1.CommentFetching();
            const fetchContext = new CommentFetchContext_1.CommentFetchContext(strategy);
            yield fetchContext.handle(req, res, next);
        });
    }
}
exports.default = CommentController;
