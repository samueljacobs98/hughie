import { Request, Response } from "express";
import { aiService, markedService, chatMongoService } from "../services";
import { InvalidMessageError } from "../core/models/errors";

const handleRequest = async (req: Request, res: Response) => {
  console.log("hit");
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

  const htmlContent = await markedService.marked(content);

  console.log("htmlContent", htmlContent);

  // const messageExchange = await chatMongoService.addMessagesExchangeToSession(
  //   sessionId,
  //   message,
  //   htmlContent
  // );

  res.header({ "Content-Type": "text/html" }).render("components/chat", {
    layout: false,
    userMessage: message,
    aiMessage: htmlContent,
  });
};

export { handleRequest };
