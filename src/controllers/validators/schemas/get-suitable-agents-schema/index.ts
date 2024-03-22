import { z } from "zod";
import { bodySchema } from "./body-schema";

const getSuitableAgentsRequestDataSchema = z.object({
  body: bodySchema,
});

export { getSuitableAgentsRequestDataSchema };
