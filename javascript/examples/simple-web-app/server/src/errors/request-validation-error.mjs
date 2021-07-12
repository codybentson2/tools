import { CustomError } from './custom-error.mjs';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  _errors;

  constructor(errors) {
    super('Invalid request parameters');
    Object.setPrototypeOf(this, RequestValidationError.prototype);

    this._errors = errors;
  }

  serializeErrors() {
    return this._errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
