import { Request, Response } from "express";

const handleRequest = async (req: Request, res: Response) => {
  res.render("v1/create-agent");
};

export { handleRequest };
