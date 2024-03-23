import { ChatRequestData as RequestData } from "../v1/core/types";
import { OpenAIMessage } from "../api/core/types";
import { openAIConnector } from "../api/connectors";
import { mongoSessionConnector } from "../v1/connectors";

const serve = async (requestData: RequestData) => {
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
