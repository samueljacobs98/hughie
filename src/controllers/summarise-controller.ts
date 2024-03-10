import { Request, Response } from "express";
import { aiService, markedService } from "../services";
import { InvalidMessageError, OpenAIError } from "../core/models/errors";
import { summariseThoughtsPrompts } from "../data/prompts";

const handleRequest = async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;

  // const messages = await redisService.getMessagesForSession(sessionId);
  // const prompt = messages.join("\n");

  // const content = await aiService.generateResponse(
  //   summariseThoughtsPrompts.system,
  //   prompt
  // );

  // const htmlContent = await markedService.marked(content);

  // res.send(htmlContent);
  res.send("htmlContent");
};

export { handleRequest };
