import { Request } from "express";
import { validate } from "./validate";
import { BadRequestError } from "../../core/models/errors";
import { CreateAgentRequestData as RequestData } from "../../core/types";
import { createAgentRequestDataSchema as schema } from "./schemas";

const validateRequest = (req: Request): RequestData => {
  return validate(
    req,
    schema,
    new BadRequestError("Invalid chat request data")
  );
};

export { validateRequest };
