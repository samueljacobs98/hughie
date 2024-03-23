import { z } from "zod";
import { getSuitableAgentsRequestDataSchema } from "../../../v1/controllers/validators/schemas";

export type GetSuitableAgentsRequestData = z.infer<
  typeof getSuitableAgentsRequestDataSchema
>;
