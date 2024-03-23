import { z } from "zod";
import { paramsSchema } from "./params-schema";

const getChatRequestDataSchema = z.object({
  params: paramsSchema,
});

export { getChatRequestDataSchema };
