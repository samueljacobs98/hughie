import { Request, Response } from "express";
import { banners } from "../../api/data/banners";

const handleRequest = async (req: Request, res: Response) => {
  const banner = banners[Math.floor(Math.random() * banners.length)];

  res.render("v1/home", {
    banner,
  });
};

export { handleRequest };
