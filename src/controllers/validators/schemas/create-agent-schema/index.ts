import { z } from "zod";
import { bodySchema } from "./body-schema";

const createAgentRequestDataSchema = z.object({
  body: bodySchema,
});

export { createAgentRequestDataSchema };
