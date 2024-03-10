import express from "express";
import * as middleware from "./middleware";
import {
  chatController,
  homeController,
  summariseController,
} from "./controllers";
import { action } from "./utils/action";
import { Logger } from "./utils/logger";
import { db } from "./database";

db.connect();

const app = express();
const port = 3000;

const logger = Logger.new("App");

middleware.addMiddleware(app);

app.post("/session/:sessionId/chat", action(chatController.handleRequest));

app.post(
  "/session/:sessionId/summarise",
  action(summariseController.handleRequest)
);

app.get("/", homeController.handleRequest);

app.listen(port, () => {
  logger.log("listen", `Server is running on port ${port}`);
});
