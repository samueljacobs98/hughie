import { z } from "zod";
import { paramsSchema } from "./params-schema";

const summariseSchema = z.object({
  params: paramsSchema,
});

export { summariseSchema };
