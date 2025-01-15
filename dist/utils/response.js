"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    static success(res, status, message, data) {
        const responseData = {
            success: true,
            message,
            data: data || null,
        };
        return res.status(status).json(responseData);
    }
    static error(res, status, message, errorDetails) {
        const responseData = {
            success: false,
            message,
            error: errorDetails || null,
        };
        return res.status(status).json(responseData);
    }
}
exports.default = Response;
