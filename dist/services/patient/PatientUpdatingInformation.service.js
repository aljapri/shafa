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
const Patient_model_1 = require("../../models/Patient.model");
class UpdateInformationCommand {
    constructor(firstName, lastName, phone, photo, accountId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.photo = photo;
        this.accountId = accountId;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield Patient_model_1.Patient.findById(this.accountId);
            if (!document) {
                throw HttpResponse_1.default.NotFound("patient facility not found.");
            }
            // Prepare the update data, excluding password and email
            console.log("one");
            if (this.firstName)
                document.firstName = this.firstName;
            if (this.lastName)
                document.lastName = this.lastName;
            if (this.phone)
                document.phone = this.phone;
            if (this.photo)
                document.photo = this.photo;
            yield document.save();
            return HttpResponse_1.default.Ok(document);
        });
    }
}
exports.default = UpdateInformationCommand;
