import { Request } from "express";
import { getSuitableAgentsRequestDataSchema } from "./schemas";
import { BadRequestError } from "../../core/models/errors";
import { validate } from "./validate";

const validateRequest = (req: Request) => {
  return validate(
    req,
    getSuitableAgentsRequestDataSchema,
    new BadRequestError("Invalid chat request data")
  );
};

export { validateRequest };
