import mongoose from "mongoose";
import { Logger } from "../utils/logger";
import { config } from "../config";

const logger = Logger.new("mongoose");

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error: ", err);
  logger.error("Mongoose connection", err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection established.");
  logger.log("connect", "MongoDB connected...");
});

const connect = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    logger.error("connect", error);
  }
};

export { connect };
