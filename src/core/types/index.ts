import { OpenAI } from "openai";

type Params = OpenAI.Chat.ChatCompletionCreateParams;
type Message = OpenAI.Chat.Completions.ChatCompletionMessageParam;

export { Params, Message };
