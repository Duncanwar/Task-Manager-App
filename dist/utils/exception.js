"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadGatewayException = exports.ServerErrorException = exports.TooManyRequestsException = exports.ConflictException = exports.NotFoundException = exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.CustomException = void 0;
class CustomException extends Error {
    constructor(message, name, statusCode) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}
exports.CustomException = CustomException;
class BadRequestException extends CustomException {
    constructor(message) {
        super(message || "Bad Request", "BadRequestException", 400);
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends CustomException {
    constructor(message) {
        super(message || "Unauthorized", "UnauthorizedException", 401);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends CustomException {
    constructor(message) {
        super(message || "Forbidden", "ForbiddenException", 403);
    }
}
exports.ForbiddenException = ForbiddenException;
class NotFoundException extends CustomException {
    constructor(message) {
        super(message || "Not Found", "NotFoundException", 404);
    }
}
exports.NotFoundException = NotFoundException;
class ConflictException extends CustomException {
    constructor(message) {
        super(message || "Conflict", "ConflictException", 409);
    }
}
exports.ConflictException = ConflictException;
class TooManyRequestsException extends CustomException {
    constructor(message) {
        super(message || "Too Many Requests", "TooManyRequestsException", 429);
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
class ServerErrorException extends CustomException {
    constructor(message) {
        super(message || "Server Error", "ServerErrorException", 500);
    }
}
exports.ServerErrorException = ServerErrorException;
class BadGatewayException extends CustomException {
    constructor(message) {
        super(message || "Bad Gateway", "BadGatewayException", 502);
    }
}
exports.BadGatewayException = BadGatewayException;
