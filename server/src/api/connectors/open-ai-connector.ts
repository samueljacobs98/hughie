import OpenAI from "openai";
import { OpenAIError } from "../core/models/errors";
import { OpenAIMessage, OpenAIParams } from "../core/types";
import { config } from "../config";

const openai = new OpenAI({ apiKey: config.openai.apiKey });

const completionsModel = "gpt-3.5-turbo";
const embeddingModel = "text-embedding-3-small";

const generateResponse = async (
  system: string,
  prompt: string,
  messages: OpenAIMessage[]
) => {
  const params: OpenAIParams = {
    model: completionsModel,
    messages: [
      {
        role: "system",
        content: system,
      },
      ...messages,
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    const response = await openai.chat.completions.create(params);
    const { content } = response.choices[0].message;

    if (!content) {
      throw new Error("Failed to generate response");
    }

    return content;
  } catch (error) {
    throw new OpenAIError(`Error generating response (${error})`);
  }
};

const generateEmbedding = async (prompt: string) => {
  const embedding = await openai.embeddings.create({
    model: embeddingModel,
    input: prompt,
    encoding_format: "float",
  });

  return embedding.data[0].embedding;
};

export { generateResponse, generateEmbedding };
