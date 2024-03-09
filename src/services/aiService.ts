import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey });

type Params = OpenAI.Chat.ChatCompletionCreateParams;
type Response = OpenAI.Chat.ChatCompletionMessage;

const model = "gpt-3.5-turbo";

const generateResponse = async (context: string, prompt: string) => {
  const params: Params = {
    model,
    messages: [
      {
        role: "system",
        content: context,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const response = await openai.chat.completions.create(params);

  return response.choices[0].message;
};

export { generateResponse };
