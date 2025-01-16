import AppError from "./appError";

class HttpResponse<T> {
    statusCode: number;
    status: string;
    data?: T;

    constructor(statusCode: number, status: string, data?: T) {
        this.statusCode = statusCode;
        this.status = status;
        this.data = data;
    }

    // Static method for 200 OK response with data
    static Ok<T>(data: T): HttpResponse<T> {
        return new HttpResponse(200, "OK", data);
    }

    // Static method for 201 Created response
    static Created<T>(data: T): HttpResponse<T> {
        return new HttpResponse(201, "Created", data);
    }

    // Static method for 204 No Content response
    static NoContent() {
        return new AppError("No Content", 204);
    }

    // Static method for 400 Bad Request response
    static BadRequest(message: string): any {
        return new AppError(message, 400);
    }

    // Static method for 401 Unauthorized response
    static Unauthorized(message: string): any {
        return new AppError(message, 401);
    }

    // Static method for 403 Forbidden response
    static Forbidden(message: string): any {
        return new AppError(message, 403);
    }

    // Static method for 404 Not Found response
    static NotFound(message: string): any {
        return new AppError(message, 404);
    }

    // Static method for 409 Conflict response
    static Conflict(message: string): any {
        return new AppError(message, 409);
    }

    // Static method for 500 Internal Server Error response
    static InternalServerError(): any {
        
        return new AppError("something went wrong", 500);
    }

    // Static method for 502 Bad Gateway response
    static BadGateway(message: string): any {
        return new AppError(message, 502);
    }

    // Static method for 503 Service Unavailable response
    static ServiceUnavailable(message: string): any {
        return new AppError(message, 503);
    }
}

export default HttpResponse;
