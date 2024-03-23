import { mongoSessionConnector } from "../connectors";
import { SummariseRequestData as RequestData } from "../core/types";
import { summariseThoughtsPrompts as prompts } from "../../api/data/prompts";
import { OpenAIMessage } from "../../api/core/types";
import { openAIConnector } from "../../api/connectors";

const serve = async (requestData: RequestData) => {
  const session = await mongoSessionConnector.getSession(
    requestData.params.sessionId
  );
  const sessionMessages: OpenAIMessage[] = session.messages
    .filter((message) => message.role !== "system")
    .map(
      (message) =>
        ({
          role: message.role,
          content: message.content,
        } as OpenAIMessage)
    );

  /**
   * TODO:
   * Create the summary based on the last summary and the new messages since
   * the last summary.
   */
  const aiResponse = await openAIConnector.generateResponse(
    prompts.system,
    prompts.user,
    sessionMessages
  );

  await mongoSessionConnector.updateSummary(aiResponse, session);
};

export { serve };
