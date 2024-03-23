import { mongoAgentConnector } from "../connectors";
import { CreateAgentRequestData as RequestData } from "../core/types";

const serve = async (requestData: RequestData) => {
  const agent = await mongoAgentConnector.createAgent(requestData.body);

  return agent;
};

export { serve };
