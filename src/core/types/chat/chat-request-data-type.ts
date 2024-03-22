import { z } from "zod";
import { chatRequestDataSchema } from "../../../controllers/validators/schemas";

export type ChatRequestData = z.infer<typeof chatRequestDataSchema>;
