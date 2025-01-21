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
exports.UpdateInformationCommand = void 0;
const medicalFacility_model_1 = require("../../models/medicalFacility.model");
const HttpResponse_1 = __importDefault(require("../../utils/HttpResponse"));
class UpdateInformationCommand {
    constructor(name, phone, photo, accountId, description) {
        this.name = name;
        this.phone = phone;
        this.photo = photo;
        this.accountId = accountId;
        this.description = description;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const document = yield medicalFacility_model_1.MedicalFacility.findById(this.accountId);
            if (!document) {
                throw HttpResponse_1.default.NotFound("Medical facility not found.");
            }
            if (this.name)
                document.name = this.name;
            if (this.phone)
                document.phone = this.phone;
            if (this.photo)
                document.photo = this.photo;
            if (this.description)
                document.description = this.description;
            yield document.save();
            return HttpResponse_1.default.Ok(document);
        });
    }
}
exports.UpdateInformationCommand = UpdateInformationCommand;
