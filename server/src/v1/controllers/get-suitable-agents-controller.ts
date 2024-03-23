import { Request, Response } from "express";
import { getSuitableAgentsValidator as validator } from "./validators";
import { getSuitableAgentsService as service } from "../services";
import { GetSuitableAgentsRequestData as RequestData } from "../core/types";

const handleRequest = async (req: Request, res: Response) => {
  const requestData: RequestData = validator.validateRequest(req);

  const agents = await service.serve({ ...requestData });

  res.render("v1/components/agents", {
    layout: false,
    agents,
  });
};

export { handleRequest };
