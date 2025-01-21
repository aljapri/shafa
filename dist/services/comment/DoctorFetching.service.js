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
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_model_1 = require("../../models/Comment.model");
class DoctorFetching {
    fetch(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params.commentId;
            const patientId = req.accountId;
            const comments = yield Comment_model_1.Comment.find({ _id: commentId, patient: patientId, isActive: true });
            return comments;
        });
    }
}
exports.default = DoctorFetching;
