import { z } from "zod";
import { createAgentRequestDataSchema } from "../../../v1/controllers/validators/schemas";

export type CreateAgentRequestData = z.infer<
  typeof createAgentRequestDataSchema
>;
