import { Request, Response } from "express";
import { aiService, chatMongoService } from "../services";
import { InvalidMessageError } from "../core/models/errors";

const handleRequest = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { message, context } = req.body;

  if (!(typeof message === "string" && message.length > 0)) {
    throw new InvalidMessageError("Please provide a [valid] message");
  }

  const session = { messages: undefined };
  // const session = await chatMongoService.getSession(sessionId);
  const sessionMessages = session?.messages || [];

  const content = await aiService.generateResponse(
    context,
    message,
    sessionMessages
  );

  console.log("content", content);

  // const messageExchange = await chatMongoService.addMessagesExchangeToSession(
  //   sessionId,
  //   message,
  //   content
  // );

  res.header({ "Content-Type": "text/html" }).render("components/chat", {
    layout: false,
    userMessage: message,
    aiMessage: content,
  });
};

export { handleRequest };
