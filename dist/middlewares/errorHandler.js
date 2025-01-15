"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("Error Log:", err); // Log the error
    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || "Something went wrong. Please try again later.";
    res.status(statusCode).json(Object.assign({ success: false, message }, (process.env.NODE_ENV === "development" && { stack: err.stack })));
};
exports.errorHandler = errorHandler;
