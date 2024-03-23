import { Request, Response } from "express";
import { banners } from "../../api/data/banners";

const handleRequest = async (req: Request, res: Response) => {
  const banner = banners[Math.floor(Math.random() * banners.length)];

  res.render("home", {
    banner,
  });
};

export { handleRequest };
