import { Request, Response } from "express";

const handleRequest = async (req: Request, res: Response) => {
  res.render("create-agent");
};

export { handleRequest };
