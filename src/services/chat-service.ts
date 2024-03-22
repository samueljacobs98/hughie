import { mongoSessionConnector, openAIConnector } from "../connectors";
import { OpenAIMessage } from "../core/types";

interface ServeInput {
  params: {
    agentId: string;
    sessionId: string;
  };
  body: {
    context: string;
    message: string;
  };
}

const serve = async ({ params, body }: ServeInput) => {
  const session = await mongoSessionConnector.getSession(params.sessionId);
  const sessionMessages: OpenAIMessage[] = session.messages.map(
    (message) =>
      ({
        role: message.role,
        content: message.content,
      } as OpenAIMessage)
  );

  const aiResponse = await openAIConnector.generateResponse(
    body.context,
    body.message,
    sessionMessages
  );

  await mongoSessionConnector.addMessagesExchangeToSession(
    session,
    body.message,
    aiResponse
  );

  return { aiResponse };
};

export { serve };
