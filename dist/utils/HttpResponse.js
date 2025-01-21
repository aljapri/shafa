"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("./appError"));
class HttpResponse {
    constructor(statusCode, status, data) {
        this.statusCode = statusCode;
        this.status = status;
        this.data = data;
    }
    // Static method for 200 OK response with data
    static Ok(data) {
        return new HttpResponse(200, "OK", data);
    }
    // Static method for 201 Created response
    static Created(data) {
        return new HttpResponse(201, "Created", data);
    }
    // Static method for 204 No Content response
    static NoContent() {
        return new appError_1.default("No Content", 204);
    }
    // Static method for 400 Bad Request response
    static BadRequest(message) {
        return new appError_1.default(message, 400);
    }
    // Static method for 401 Unauthorized response
    static Unauthorized(message) {
        return new appError_1.default(message, 401);
    }
    // Static method for 403 Forbidden response
    static Forbidden(message) {
        return new appError_1.default(message, 403);
    }
    // Static method for 404 Not Found response
    static NotFound(message) {
        return new appError_1.default(message, 404);
    }
    // Static method for 409 Conflict response
    static Conflict(message) {
        return new appError_1.default(message, 409);
    }
    // Static method for 500 Internal Server Error response
    static InternalServerError() {
        return new appError_1.default("something went wrong", 500);
    }
    // Static method for 502 Bad Gateway response
    static BadGateway(message) {
        return new appError_1.default(message, 502);
    }
    // Static method for 503 Service Unavailable response
    static ServiceUnavailable(message) {
        return new appError_1.default(message, 503);
    }
}
exports.default = HttpResponse;
