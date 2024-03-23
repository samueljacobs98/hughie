import { z } from "zod";
import { summariseRequestDataSchema } from "../../../controllers/validators/schemas";

export type SummariseRequestData = z.infer<typeof summariseRequestDataSchema>;
