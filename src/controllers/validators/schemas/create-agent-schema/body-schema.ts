import { z } from "zod";

/**
 * TODO: Refine schema
 */
const bodySchema = z.object({
  name: z.string(),
  color: z.string(),
  tagline: z.string(),
  description: z.string(),
  autobiography: z.string(),
  prompt: z.string(),
});

export { bodySchema };
