import { Request, Response } from "express";
import { summariseValidator as validator } from "./validators";
import { summariseService as service } from "../services";
import { SummariseRequestData as RequestData } from "../core/types";

const handleRequest = async (req: Request, res: Response) => {
  const requestData: RequestData = validator.validateRequest(req);

  const aiResponse = await service.serve({ ...requestData });

  res.header({ "Content-Type": "text/html" }).render("v1/components/chat", {
    layout: false,
    aiMessage: aiResponse,
  });
};

export { handleRequest };
