import { Request, Response } from "express";
import { v4 as uuid } from "uuid";

const handleRequest = (req: Request, res: Response) => {
  const sessionId = uuid();
  res.render("home", {
    layout: false,
    sessionId,
    session: `Session Id: ${sessionId}`,
  });
};

export { handleRequest };
