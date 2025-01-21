"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseFetchStrategy = void 0;
const ApiFeatures_1 = __importDefault(require("./ApiFeatures"));
class BaseFetchStrategy {
    applyAPIFeatures(query, reqQuery) {
        return new ApiFeatures_1.default(query, reqQuery).sort().limitFields().paginate();
    }
}
exports.BaseFetchStrategy = BaseFetchStrategy;
