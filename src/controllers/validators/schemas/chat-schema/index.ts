import { z } from "zod";
import { bodySchema } from "./body-schema";
import { paramsSchema } from "./params-schema";

const chatSchema = z.object({
  params: paramsSchema,
  body: bodySchema,
});

export { chatSchema };
