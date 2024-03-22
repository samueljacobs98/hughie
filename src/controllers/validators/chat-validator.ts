import { Request } from "express";
import { chatRequestDataSchema } from "./schemas";
import { BadRequestError } from "../../core/models/errors";
import { validate } from "./validate";
import { ChatRequestData } from "../../core/types";

const validateRequest = (req: Request): ChatRequestData => {
  return validate(
    req,
    chatRequestDataSchema,
    new BadRequestError("Invalid chat request data")
  );
};

export { validateRequest };
