import { z } from "zod";
import { paramsSchema } from "./params-schema";

const summariseRequestDataSchema = z.object({
  params: paramsSchema,
});

export { summariseRequestDataSchema };
