import { z } from "zod";

const paramsSchema = z.object({
  agentId: z.string(),
});

export { paramsSchema };
