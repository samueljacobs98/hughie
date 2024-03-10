import { Request, Response } from "express";
import { aiService, chatMongoService } from "../services";
import { InvalidMessageError } from "../core/models/errors";

const handleRequest = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { message, context } = req.body;

  if (!(typeof message === "string" && message.length > 0)) {
    throw new InvalidMessageError("Please provide a [valid] message");
  }

  const session = await chatMongoService.getSession(sessionId);
  const sessionMessages = session.messages;

  const aiMessage = await aiService.generateResponse(
    context,
    message,
    sessionMessages
  );

  await chatMongoService.addMessagesExchangeToSession(
    session,
    message,
    aiMessage
  );

  res.header({ "Content-Type": "text/html" }).render("components/chat", {
    layout: false,
    userMessage: message,
    aiMessage: aiMessage,
  });
};

export { handleRequest };
