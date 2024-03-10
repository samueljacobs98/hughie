import mongoose from "mongoose";
import { Logger } from "../utils/logger";

const logger = Logger.new("mongoose");

const databaseURL: string = "mongodb://localhost:27017/yourDatabaseName";

const connect = async () => {
  try {
    await mongoose.connect(databaseURL);
    logger.log("connect", "MongoDB connected...");
  } catch (error) {
    logger.error("connect", error);
  }
};

connect();

export { mongoose };
