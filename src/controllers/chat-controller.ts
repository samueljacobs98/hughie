import { Request, Response } from "express";
import { aiService, markedService } from "../services";

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

  const { content } = await aiService.generateResponse(context, message);

  if (!content) {
    res.render("components/error", {
      layout: false,
      message: "Error: Failed to generate response",
    });
    return;
  }

  const htmlContent = markedService.marked(content);

  res.header({ "Content-Type": "text/html" }).render("components/chat", {
    layout: false,
    userMessage: message,
    aiMessage: htmlContent,
  });
};

export { handleRequest };
