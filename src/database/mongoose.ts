import mongoose, { AnyObject } from "mongoose";
import { Logger } from "../utils/logger";
import { config } from "../config";

const logger = Logger.new("mongoose");

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error: ", err);
  logger.error("Mongoose connection", err);
});

mongoose.connection.once("open", () => {
  logger.log("connect", "MongoDB connected...");
});

const connect = async () => {
  try {
    await mongoose.connect(config.mongo.uri);
  } catch (error) {
    logger.error("connect", `"Failed to connect to MongoDB - ${error}`);
  }
};

const getCollection = <T extends AnyObject>(collectionName: string) => {
  return mongoose.connection.collection<T>(collectionName);
};

export { connect, getCollection };
