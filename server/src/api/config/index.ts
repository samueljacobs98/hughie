import assert from "assert";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
assert(apiKey, "OPENAI_API_KEY is not set");

const mongoUri = process.env.MONGO_ATLAS_URI;
assert(mongoUri, "MONGO_ATLAS_URI is not set");

const config = {
  openai: { apiKey },
  mongo: { uri: mongoUri },
};

export { config };
