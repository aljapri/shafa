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
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
const Doctor_model_1 = require("../../models/Doctor.model");
class UpdateInformationCommand {
    constructor(firstName, lastName, specialization, description, phone, photo, maxPatients, gender, experience, accountId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.description = description;
        this.phone = phone;
        this.photo = photo;
        this.maxPatients = maxPatients;
        this.gender = gender;
        this.accountId = accountId;
        this.experience = experience;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield Doctor_model_1.Doctor.findById(this.accountId);
            if (!document) {
                throw HttpResponse_1.default.NotFound("Medical facility not found.");
            }
            // Prepare the update data, excluding password and email
            if (this.firstName)
                document.firstName = this.firstName;
            if (this.lastName)
                document.lastName = this.lastName;
            if (this.specialization)
                document.specialization = this.specialization;
            if (this.description)
                document.description = this.description;
            if (this.phone)
                document.phone = this.phone;
            if (this.photo)
                document.photo = this.photo;
            if (this.maxPatients)
                document.maxPatients = this.maxPatients;
            if (this.gender)
                document.gender = this.gender;
            if (this.experience)
                document.experience = this.experience;
            yield document.save();
            return HttpResponse_1.default.Ok(document);
        });
    }
}
exports.default = UpdateInformationCommand;
