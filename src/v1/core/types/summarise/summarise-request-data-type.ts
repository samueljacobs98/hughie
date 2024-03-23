import { z } from "zod";
import { summariseRequestDataSchema } from "../../../v1/controllers/validators/schemas";

export type SummariseRequestData = z.infer<typeof summariseRequestDataSchema>;
