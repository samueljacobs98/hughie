import { Request, Response } from "express";
import { aiService, markedService, redisService } from "../services";
import { InvalidMessageError } from "../core/models/errors";

const handleRequest = async (req: Request, res: Response) => {
  const { sessionId } = req.params;
  const { message, context } = req.body;

  if (!(typeof message === "string" && message.length > 0)) {
    throw new InvalidMessageError("Please provide a [valid] message");
  }

  const content = await aiService.generateResponse(context, message);
  const htmlContent = await markedService.marked(content);

  const messageExchange = {
    userMessage: message,
    aiMessage: htmlContent,
  };

  await redisService.addMessagesToSession(sessionId, messageExchange);

  res.header({ "Content-Type": "text/html" }).render("components/chat", {
    layout: false,
    ...messageExchange,
  });
};

export { handleRequest };
