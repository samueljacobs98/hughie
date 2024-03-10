import { Request, Response } from "express";
import { HughieError } from "../core/models/errors";
import { Logger } from "./logger";

const logger = Logger.new("action");

const action = (fn: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await fn(req, res);
    } catch (error) {
      if (error instanceof HughieError) {
        logger.error("action", error.message);
        res.render("components/error", {
          layout: false,
          message: `[Error][${error.name}] ${error.message}`,
        });
        return;
      }

      logger.error("action", error);
      res.render("components/error", {
        layout: false,
        message: `[Error][Internal Server Error]: Something went wrong with Hughie...`,
      });
    }
  };
};

export { action };
