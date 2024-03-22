import { z } from "zod";
import { getChatRequestDataSchema } from "../../../controllers/validators/schemas";

export type GetChatRequestData = z.infer<typeof getChatRequestDataSchema>;
