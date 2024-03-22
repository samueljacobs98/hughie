import { z } from "zod";
import { getSuitableAgentsRequestDataSchema } from "../../../controllers/validators/schemas";

export type GetSuitableAgentsRequestData = z.infer<
  typeof getSuitableAgentsRequestDataSchema
>;
