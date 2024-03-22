import OpenAI from "openai";
import { OpenAIError } from "../core/models/errors";
import { OpenAIMessage, OpenAIParams } from "../core/types";
import { config } from "../config";

const openai = new OpenAI({ apiKey: config.openai.apiKey });

const model = "gpt-3.5-turbo";

const generateResponse = async (
  system: string,
  prompt: string,
  messages: OpenAIMessage[]
) => {
  const params: OpenAIParams = {
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
