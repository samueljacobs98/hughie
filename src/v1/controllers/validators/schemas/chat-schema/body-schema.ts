import { z } from "zod";

const bodySchema = z.object({
  message: z.string(),
  context: z.string(),
});

export { bodySchema };
