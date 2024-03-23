import { Request, Response } from "express";
import { createAgentValidator as validator } from "./validators";
import { createAgentService as service } from "../services";
import { CreateAgentRequestData as RequestData } from "../core/types";

const handleRequest = async (req: Request, res: Response) => {
  const requestData: RequestData = validator.validateRequest(req);

  const { agentId, color, name } = await service.serve(requestData);

  res
    .header({ "Content-Type": "text/html" })
    .render("components/agent-created", {
      layout: false,
      agentId,
      color,
      name,
    });
};

export { handleRequest };
