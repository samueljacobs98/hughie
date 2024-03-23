import { z } from "zod";
import { getChatRequestDataSchema } from "../../../v1/controllers/validators/schemas";

export type GetChatRequestData = z.infer<typeof getChatRequestDataSchema>;
