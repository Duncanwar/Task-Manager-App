"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppException extends Error {
    constructor(message, statusCode = 500, details) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        // Ensure the name of this error is the same as the class name
        Object.setPrototypeOf(this, new.target.prototype);
        // Capture stack trace for debugging
        Error.captureStackTrace(this);
    }
}
exports.default = AppException;
