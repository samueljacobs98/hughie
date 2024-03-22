import { Request, Response } from "express";
import { getChatService } from "../services";
import { getChatValidator } from "./validators";
import { GetChatRequestData } from "../core/types";

const handleRequest = async (req: Request, res: Response) => {
  const requestData: GetChatRequestData = getChatValidator.validateRequest(req);

  const sessionId = await getChatService.serve();

  res.render("chat", {
    layout: false,
    sessionId,
    agentId: requestData.params.agentId,
  });
};

export { handleRequest };
