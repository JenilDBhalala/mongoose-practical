export class UnauthorizedError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

export class BadRequest extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

export class ForbiddenError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}

export class NotFoundError extends Error {
  status: number;
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}