import { Request } from "express";
import { chatSchema } from "./schemas";
import { BadRequestError } from "../../core/models/errors";
import { validate } from "./validate";

const chatValidator = (req: Request) => {
  return validate(
    req,
    chatSchema,
    new BadRequestError("Invalid chat request data")
  );
};

export { chatValidator };
