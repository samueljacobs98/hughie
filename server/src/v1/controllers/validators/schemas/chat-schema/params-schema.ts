import { z } from "zod";

const paramsSchema = z.object({
  agentId: z.string(),
  sessionId: z.string(),
});

export { paramsSchema };
