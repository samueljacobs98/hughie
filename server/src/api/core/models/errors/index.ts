import { HughieError } from "./HughieError";

/**
 * InternalServerError
 * @description
 * This error is thrown when an internal server error occurs.
 * @extends HughieError
 */
class InternalServerError extends HughieError {
  constructor(message: string) {
    super("Internal Server Error", message, 500);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

/**
 * BadRequestError
 * @description
 * This error is thrown when a bad request error occurs.
 * @extends HughieError
 */
class BadRequestError extends HughieError {
  constructor(message: string) {
    super("Bad Request Error", message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

/**
 * InvalidMessageError
 * @description
 * This error is thrown when an invalid message is provided.
 * @extends HughieError
 */
class InvalidMessageError extends HughieError {
  constructor(message: string) {
    super("Invalid Message Error", message, 400);
    Object.setPrototypeOf(this, InvalidMessageError.prototype);
  }
}

/**
 * MongoError
 * @description
 * This error is thrown when a Mongo error occurs.
 * @extends HughieError
 */
class MongoError extends HughieError {
  constructor(message: string) {
    super("Mongo Error", message, 500);
    Object.setPrototypeOf(this, MongoError.prototype);
  }
}

/**
 * OpenAIError
 * @description
 * This error is thrown when an OpenAI error occurs.
 * @extends HughieError
 */
class OpenAIError extends HughieError {
  constructor(message: string) {
    super("OpenAI Error", message, 500);
    Object.setPrototypeOf(this, OpenAIError.prototype);
  }
}

/**
 * MarkedError
 * @description
 * This error is thrown when a Marked error occurs.
 * @extends HughieError
 */
class MarkedError extends HughieError {
  constructor(message: string) {
    super("Marked Error", message, 500);
    Object.setPrototypeOf(this, MarkedError.prototype);
  }
}

export {
  HughieError,
  BadRequestError,
  InvalidMessageError,
  InternalServerError,
  MongoError,
  OpenAIError,
  MarkedError,
};
