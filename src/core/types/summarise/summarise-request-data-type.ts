import { z } from "zod";
import { summariseSchema } from "../../../controllers/validators/schemas";

export type SummariseRequestData = z.infer<typeof summariseSchema>;
