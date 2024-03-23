import { mongoSessionConnector, openAIConnector } from "../connectors";
import { ChatRequestData, OpenAIMessage } from "../core/types";

const serve = async (requestData: ChatRequestData) => {
  const session = await mongoSessionConnector.getSession(
    requestData.params.sessionId
  );
  const sessionMessages: OpenAIMessage[] = session.messages.map(
    (message) =>
      ({
        role: message.role,
        content: message.content,
      } as OpenAIMessage)
  );

  const aiResponse = await openAIConnector.generateResponse(
    requestData.body.context,
    requestData.body.message,
    sessionMessages
  );

  await mongoSessionConnector.addMessagesExchangeToSession(
    session,
    requestData.body.message,
    aiResponse
  );

  return { aiResponse };
};

export { serve };
