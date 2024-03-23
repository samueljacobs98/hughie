import { ZodSchema, ZodTypeAny } from "zod";
import { BadRequestError, HughieError } from "../../../api/core/models/errors";
import { Request } from "express";

const validate = <T>(
  req: Request,
  schema: ZodSchema<T>,
  error?: HughieError
) => {
  const validationResult = schema.safeParse(req);
  if (!validationResult.success) {
    throw error || new BadRequestError("Invalid request data");
  }

  return validationResult.data;
};

export { validate };
