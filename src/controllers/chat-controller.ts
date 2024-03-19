import { Request, Response } from "express";
import { aiService, chatMongoService } from "../services";
import { InvalidMessageError } from "../core/models/errors";
import { Message } from "../core/types";
import { chatValidator } from "./validators";

const handleRequest = async (req: Request, res: Response) => {
  const { params, body } = chatValidator(req);

  const { sessionId } = params;
  const { message, context } = body;

  const session = await chatMongoService.getSession(sessionId);
  const sessionMessages: Message[] = session.messages.map(
    (message) =>
      ({
        role: message.role,
        content: message.content,
      } as Message)
  );

  const aiResponse = await aiService.generateResponse(
    context,
    message,
    sessionMessages
  );

  await chatMongoService.addMessagesExchangeToSession(
    session,
    message,
    aiResponse
  );

  res.header({ "Content-Type": "text/html" }).render("components/chat", {
    layout: false,
    userMessage: message,
    aiMessage: aiResponse,
  });
};

export { handleRequest };
