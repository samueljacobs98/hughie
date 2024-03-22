import { Request } from "express";
import { getChatRequestDataSchema } from "./schemas";
import { BadRequestError } from "../../core/models/errors";
import { validate } from "./validate";
import { GetChatRequestData } from "../../core/types";

const validateRequest = (req: Request): GetChatRequestData => {
  return validate(
    req,
    getChatRequestDataSchema,
    new BadRequestError("Invalid chat request data")
  );
};

export { validateRequest };
