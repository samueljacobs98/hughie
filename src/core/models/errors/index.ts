import { HughieError } from "./HughieError";

/**
 * InternalServerError
 * @description
 * This error is thrown when an internal server error occurs.
 * @extends HughieError
 */
class InternalServerError extends HughieError {
  constructor(message: string) {
    super("Internal Server Error", message);
    Object.setPrototypeOf(this, InternalServerError.prototype);
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
    super("Invalid Message Error", message);
    Object.setPrototypeOf(this, InvalidMessageError.prototype);
  }
}

/**
 * RedisError
 * @description
 * This error is thrown when a Redis error occurs.
 * @extends HughieError
 */
class RedisError extends HughieError {
  constructor(message: string) {
    super("Redis Error", message);
    Object.setPrototypeOf(this, RedisError.prototype);
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
    super("OpenAI Error", message);
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
    super("Marked Error", message);
    Object.setPrototypeOf(this, MarkedError.prototype);
  }
}

export {
  HughieError,
  InvalidMessageError,
  InternalServerError,
  RedisError,
  OpenAIError,
  MarkedError,
};
