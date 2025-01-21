"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const CommentController_1 = __importDefault(require("../controllers/CommentController"));
const commentRoutes = express_1.default.Router({ mergeParams: true });
const commentController = new CommentController_1.default();
// Authorization middleware setup
commentRoutes.post('/', (0, catchAsync_1.default)(commentController.createComment.bind(commentController)));
commentRoutes.get('/', (0, catchAsync_1.default)(commentController.fetchComments.bind(commentController)));
commentRoutes.get('/:commentId', (0, catchAsync_1.default)(commentController.fetchComment.bind(commentController)));
commentRoutes.patch('/:commentId/delete', (0, catchAsync_1.default)(commentController.deleteComment.bind(commentController)));
commentRoutes.patch('/:commentId/update', (0, catchAsync_1.default)(commentController.updateComment.bind(commentController)));
// commentRoutes.get(
//   '/:appointmentId/detail',
//   asyncWrapper(commentController.fetchAppointmentDetails.bind(commentController))
// );
exports.default = commentRoutes;
