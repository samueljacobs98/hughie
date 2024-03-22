import { Request, Response } from "express";
import { banners } from "../data/banners";

const handleRequest = async (req: Request, res: Response) => {
  const banner = banners[Math.floor(Math.random() * banners.length)];

  res.render("home", {
    layout: false,
    banner,
  });
};

export { handleRequest };
