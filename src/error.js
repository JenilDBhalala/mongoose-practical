class UnauthorizedError extends Error {
    constructor (message) {
        super(message);
        this.status = 401;
    }
}

class BadRequest extends Error {
    constructor (message) {
        super(message);
        this.status = 400;
    }
}

class ForbiddenError extends Error {
    constructor (message) {
        super(message);
        this.status = 403;
    }
}

class NotFoundError extends Error {
    constructor (message) {
        super(message);
        this.status = 404;
    }
}

module.exports = {
    UnauthorizedError,
    BadRequest,
    ForbiddenError, 
    NotFoundError,
}