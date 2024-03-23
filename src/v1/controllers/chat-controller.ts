import { Request, Response } from "express";
import { chatService as service } from "../services";
import { chatValidator as validator } from "./validators";
import { ChatRequestData as RequestData } from "../core/types";

const handleRequest = async (req: Request, res: Response) => {
  const requestData: RequestData = validator.validateRequest(req);

  const { aiResponse } = await service.serve({ ...requestData });

  res.header({ "Content-Type": "text/html" }).render("v1/components/chat", {
    layout: false,
    userMessage: requestData.body.message,
    aiMessage: aiResponse,
  });
};

export { handleRequest };
