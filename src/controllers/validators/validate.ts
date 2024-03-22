import { ZodSchema, ZodTypeAny } from "zod";
import { BadRequestError, HughieError } from "../../core/models/errors";
import { Request } from "express";

const validate = <T>(
  req: Request,
  schema: ZodSchema<T>,
  error?: HughieError
) => {
  const validationResult = schema.safeParse(req);
  if (!validationResult.success) {
    console.log(validationResult.error.errors);
    throw error || new BadRequestError("Invalid request data");
  }

  return validationResult.data;
};

export { validate };
