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
exports.UpdateWorkScheduleCommand = void 0;
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const WorkSchedule_model_1 = require("../../models/WorkSchedule.model");
class UpdateWorkScheduleCommand {
    constructor(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, id) {
        this.Sunday = Sunday;
        this.Monday = Monday;
        this.Tuesday = Tuesday;
        this.Wednesday = Wednesday;
        this.Thursday = Thursday;
        this.Friday = Friday;
        this.Saturday = Saturday;
        this.id = id;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield WorkSchedule_model_1.WorkSchedule.findById(this.id);
            if (!document) {
                throw HttpResponse_1.default.NotFound("docotr not found.");
            }
            if (this.Sunday)
                document.sunday = this.Sunday;
            if (this.Monday)
                document.monday = this.Monday;
            if (this.Tuesday)
                document.tuesday = this.Tuesday;
            if (this.Wednesday)
                document.wednesday = this.Wednesday;
            if (this.Thursday)
                document.thursday = this.Thursday;
            if (this.Friday)
                document.friday = this.Friday;
            if (this.Saturday)
                document.saturday = this.Saturday;
            yield document.save();
            return HttpResponse_1.default.Ok(document);
        });
    }
}
exports.UpdateWorkScheduleCommand = UpdateWorkScheduleCommand;
