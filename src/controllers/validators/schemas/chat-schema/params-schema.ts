import { z } from "zod";

const paramsSchema = z.object({
  sessionId: z.string(),
});

export { paramsSchema };
