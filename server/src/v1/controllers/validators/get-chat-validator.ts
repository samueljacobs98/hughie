import { Request } from "express";
import { validate } from "./validate";
import { BadRequestError } from "../../../api/core/models/errors";
import { GetChatRequestData as RequestData } from "../../core/types";
import { getChatRequestDataSchema as schema } from "./schemas";

const validateRequest = (req: Request): RequestData => {
  return validate(
    req,
    schema,
    new BadRequestError("Invalid chat request data")
  );
};

export { validateRequest };
