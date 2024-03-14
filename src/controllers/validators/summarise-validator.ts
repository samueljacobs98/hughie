import { Request } from "express";
import { validate } from "./validate";
import { summariseSchema } from "./schemas";
import { BadRequestError } from "../../core/models/errors";

const summariseValidator = (req: Request) => {
  return validate(
    req,
    summariseSchema,
    new BadRequestError("Invalid summarise request data")
  );
};

export { summariseValidator };
