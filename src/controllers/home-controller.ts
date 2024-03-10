import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { chatMongoService } from "../services";

const handleRequest = async (req: Request, res: Response) => {
  const sessionId = uuid();

  await chatMongoService.createSession(sessionId);

  res.render("home", {
    layout: false,
    sessionId,
    session: `Session Id: ${sessionId}`,
  });
};

export { handleRequest };
