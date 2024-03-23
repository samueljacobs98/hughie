import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set");
}

const atlasUri = process.env.ATLAS_URI;
if (!atlasUri) {
  throw new Error("ATLAS_URI is not set");
}

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not set");
}

const config = {
  openai: {
    apiKey,
  },
  atlas: {
    uri: atlasUri,
  },
  mongo: {
    uri: mongoUri,
  },
};

export { config };
