import { Request, Response } from "express";
import { aiService } from "../services";

const handleRequest = async (req: Request, res: Response) => {
  const message = req.body.message;
  const context = req.body.context;

  console.log("body", req.body);

  if (!(typeof message === "string" && message.length > 0)) {
    res.render("components/error", {
      layout: false,
      message: "Error: Please provide a [valid] message",
    });
    return;
  }

  const aiMessage = await aiService.generateResponse(context, message);

  res.header({ "Context-Type": "text/html" }).render("components/chat", {
    layout: false,
    userMessage: message,
    aiMessage: aiMessage.content,
  });
};

export { handleRequest };
