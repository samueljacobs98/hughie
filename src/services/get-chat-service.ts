import { v4 as uuid } from "uuid";
import { GetChatRequestData as RequestData } from "../core/types";
import { mongoAgentConnector, mongoSessionConnector } from "../connectors";

const serve = async (requestData: RequestData) => {
  const sessionId = uuid();

  await mongoSessionConnector.createSession(sessionId);

  const agent = await mongoAgentConnector.getAgentById(
    requestData.params.agentId
  );

  return { sessionId, agent };
};

export { serve };
