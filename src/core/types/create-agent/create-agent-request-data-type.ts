import { z } from "zod";
import { createAgentRequestDataSchema } from "../../../controllers/validators/schemas";

export type CreateAgentRequestData = z.infer<
  typeof createAgentRequestDataSchema
>;
