import { Request } from "express";
import { validate } from "./validate";
import { summariseSchema } from "./schemas";
import { BadRequestError } from "../../core/models/errors";
import { SummariseRequestData } from "../../core/types";

const validateRequest = (req: Request): SummariseRequestData => {
  return validate(
    req,
    summariseSchema,
    new BadRequestError("Invalid summarise request data")
  );
};

export { validateRequest };
