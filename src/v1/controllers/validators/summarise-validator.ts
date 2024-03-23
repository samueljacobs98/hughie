import { Request } from "express";
import { validate } from "./validate";
import { BadRequestError } from "../../../api/core/models/errors";
import { SummariseRequestData as RequestData } from "../../core/types";
import { summariseRequestDataSchema as schema } from "./schemas";

const validateRequest = (req: Request): RequestData => {
  return validate(
    req,
    schema,
    new BadRequestError("Invalid summarise request data")
  );
};

export { validateRequest };
