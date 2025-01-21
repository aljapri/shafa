"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const RateController_1 = __importDefault(require("../controllers/RateController"));
const ratingRoutes = express_1.default.Router({ mergeParams: true });
const rateController = new RateController_1.default();
// Authorization middleware setup
ratingRoutes.post('/', (0, catchAsync_1.default)(rateController.createRating.bind(rateController)));
ratingRoutes.patch('/:ratingId', (0, catchAsync_1.default)(rateController.updateRating.bind(rateController)));
exports.default = ratingRoutes;
