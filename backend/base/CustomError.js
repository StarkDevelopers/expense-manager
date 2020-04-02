const { isNumber, isString, isObject } = require('util');

class CustomError extends Error {
    /**
     * @param {number} status
     * @param {string} message
     */
    constructor (status, message) {
        super(message);

        this.name = this.constructor.name;

        // Capturing stack trace, excluding constructor call from it
        Error.captureStackTrace(this, this.constructor);

        // Error code
        this.status = status || 500;
    }

    /**
     * @param {number} status
     * @param {string|object} error
     */
    static create (status, error) {
        let errorMessage = 'Invalid Operation';
        if (isString(error)) {
            errorMessage = error;
        } else if (isObject(error) && error.message) {
            errorMessage = error.message;
        }

        let statusCode = CustomError.InvalidOperation;
        if (isNumber(status)) {
            statusCode = status;
        }

        return new CustomError(statusCode, errorMessage);
    }
}

/**
 * `BadRequest` is an error that results from invalid inputs or parameters.
 * @type {number}
 */
CustomError.BadRequest = 400;
/**
 * `Unauthorized` is an error that indicates that the authentication is required of was invalid.
 * @type {number}
 */
CustomError.Unauthorized = 401;
/**
 * `Forbidden` is any error where the current requestor doesn't have access to the requested object.
 * @type {number}
 */
CustomError.Forbidden = 403;
/**
 * `NotFound` is any error where the object that was requested doesn't exist.
 * @type {number}
 */
CustomError.NotFound = 404;
/**
 * `Conflict` isIndicates that the request could not be processed because of conflict in the current
 * state of the resource, such as an edit conflict between multiple simultaneous updates.
 * @type {number}
 */
CustomError.Conflict = 409;
/**
 * `NotSupported` is any error where unsupported media type is provided.
 * @type {number}
 */
CustomError.NotSupported = 415;
/**
 * `InvalidOperation` is the default error code for for error that don't have a more specific representation.
 * @type {number}
 */
CustomError.InvalidOperation = 500;
/**
 * `NotImplemented` is thrown when a given operation has been accounted for but
 * has not been implemented (for any reason).
 * @type {number}
 */
CustomError.NotImplemented = 501;
/**
 * `Timeout` error indicates that an operation didn't compelete within the
 * allocated amount of time.
 * @type {number}
 */
CustomError.Timeout = 504;

module.exports = CustomError;
