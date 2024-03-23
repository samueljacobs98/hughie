import { z } from "zod";

const bodySchema = z.object({
  description: z.string(),
});

export { bodySchema };
