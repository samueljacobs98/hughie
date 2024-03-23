import { Request, Response } from "express";
import { getChatValidator as validator } from "./validators";
import { getChatService as service } from "../services";
import { GetChatRequestData as RequestData } from "../core/types";

const handleRequest = async (req: Request, res: Response) => {
  const requestData: RequestData = validator.validateRequest(req);

  const { sessionId, agent } = await service.serve(requestData);

  res.render("get-chat", {
    sessionId,
    agentId: requestData.params.agentId,
    context: agent?.prompt || "",
  });
};

export { handleRequest };
