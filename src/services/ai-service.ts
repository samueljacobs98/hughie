import OpenAI from "openai";
import * as dotenv from "dotenv";
import { OpenAIError } from "../core/models/errors";
import { Message, Params } from "../core/types";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

const model = "gpt-3.5-turbo";

const generateResponse = async (
  system: string,
  prompt: string,
  messages: Message[]
) => {
  const params: Params = {
    model,
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

export { generateResponse };
