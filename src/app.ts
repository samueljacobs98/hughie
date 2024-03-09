import express from "express";
import * as middleware from "./middleware";
import {
  chatController,
  homeController,
  summariseController,
} from "./controllers";

const app = express();
const port = 3000;

middleware.addMiddleware(app);

app.post("/chat", chatController.handleRequest);

app.post("/summarise", summariseController.handleRequest);

app.get("/", homeController.handleRequest);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
