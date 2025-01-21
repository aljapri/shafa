"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWorkScheduleCommand = void 0;
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const WorkSchedule_model_1 = require("../../models/WorkSchedule.model");
const Doctor_model_1 = require("../../models/Doctor.model");
class UpdateWorkScheduleCommand {
    constructor(Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, doctorId) {
        this.Sunday = Sunday;
        this.Monday = Monday;
        this.Tuesday = Tuesday;
        this.Wednesday = Wednesday;
        this.Thursday = Thursday;
        this.Friday = Friday;
        this.Saturday = Saturday;
        this.doctorId = doctorId;
    }
    async execute() {
        const docotr = await Doctor_model_1.Doctor.findById(this.doctorId);
        if (!docotr) {
            throw HttpResponse_1.default.NotFound("docotr not found.");
        }
        const document = await WorkSchedule_model_1.WorkSchedule.findById(docotr.workSchedule);
        if (!document) {
            throw HttpResponse_1.default.NotFound("docotr not found.");
        }
        if (this.Sunday)
            document.Sunday = this.Sunday;
        if (this.Monday)
            document.Monday = this.Monday;
        if (this.Tuesday)
            document.Tuesday = this.Tuesday;
        if (this.Wednesday)
            document.Wednesday = this.Wednesday;
        if (this.Thursday)
            document.Thursday = this.Thursday;
        if (this.Friday)
            document.Friday = this.Friday;
        if (this.Saturday)
            document.Saturday = this.Saturday;
        await document.save();
        return HttpResponse_1.default.Ok(document);
    }
}
exports.UpdateWorkScheduleCommand = UpdateWorkScheduleCommand;
