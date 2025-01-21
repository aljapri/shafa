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
const Comment_model_1 = require("../../models/Comment.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class CommentDeleting {
    constructor(commentId, patientId) {
        this.commentId = commentId;
        this.patientId = patientId;
    }
    /**
     * Deactivates a comment by setting `isActive` to false.
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            // Find the comment by ID
            console.log(yield Comment_model_1.Comment.findOne({ _id: "6777e126f4b579bd4b7b164c" }));
            const comment = yield Comment_model_1.Comment.findOne({ _id: this.commentId, patient: this.patientId, isActive: true });
            if (!comment) {
                throw HttpResponse_1.default.NotFound('Comment not found.');
            }
            // Set isActive to false
            comment.isActive = false;
            yield comment.save();
            return HttpResponse_1.default.Ok(comment);
        });
    }
}
exports.default = CommentDeleting;
