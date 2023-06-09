export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
    }
}
export class BadRequest extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
    }
}
export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
    }
}
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
    }
}
