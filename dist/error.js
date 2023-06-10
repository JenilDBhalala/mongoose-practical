"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = exports.ForbiddenError = exports.BadRequest = exports.UnauthorizedError = void 0;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
exports.BadRequest = BadRequest;
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
exports.NotFoundError = NotFoundError;
