import { Request, Response } from "express";
import { aiService, chatMongoService } from "../services";
import { summariseThoughtsPrompts as prompts } from "../data/prompts";
import { summariseValidator } from "./validators/summarise-validator";
import { Message } from "../core/types";

const handleRequest = async (req: Request, res: Response) => {
  const {
    params: { sessionId },
  } = summariseValidator(req);

  const session = await chatMongoService.getSession(sessionId);
  const sessionMessages: Message[] = session.messages
    .filter((message) => message.role !== "system")
    .map(
      (message) =>
        ({
          role: message.role,
          content: message.content,
        } as Message)
    );

  const aiResponse = await aiService.generateResponse(
    prompts.system,
    "",
    sessionMessages
  );

  await chatMongoService.updateSummary(aiResponse, session);

  res.header({ "Content-Type": "text/html" }).render("components/chat", {
    layout: false,
    aiMessage: aiResponse,
  });
};

export { handleRequest };
