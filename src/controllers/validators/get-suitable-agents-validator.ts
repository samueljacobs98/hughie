import { Request } from "express";
import { BadRequestError } from "../../core/models/errors";
import { validate } from "./validate";
import { GetSuitableAgentsRequestData as RequestData } from "../../core/types";
import { getSuitableAgentsRequestDataSchema as schema } from "./schemas";

const validateRequest = (req: Request): RequestData => {
  return validate(
    req,
    schema,
    new BadRequestError("Invalid chat request data")
  );
};

export { validateRequest };
