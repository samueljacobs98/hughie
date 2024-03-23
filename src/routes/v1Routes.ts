import express from "express";
import {
  chatController,
  createAgentController,
  getChatController,
  getCreateAgentController,
  getSuitableAgentsController,
  homeController,
  summariseController,
} from "../v1/controllers";
import { action } from "../api/utils";

const router = express.Router();

router.post(
  "/session/:sessionId/summarise",
  action(summariseController.handleRequest)
);

router.get("/ai/agent/create", getCreateAgentController.handleRequest);

router.post("/ai/agent/create", createAgentController.handleRequest);

router.post(
  "/ai/agent/:agentId/session/:sessionId",
  action(chatController.handleRequest)
);

router.get("/ai/agent/:agentId/chat", getChatController.handleRequest);

router.post("/ai/agent", action(getSuitableAgentsController.handleRequest));

router.get("/", homeController.handleRequest);

export { router };
