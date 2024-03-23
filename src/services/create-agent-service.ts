import { mongoAgentConnector } from "../v1/connectors";
import { CreateAgentRequestData as RequestData } from "../v1/core/types";

const serve = async (requestData: RequestData) => {
  const agent = await mongoAgentConnector.createAgent(requestData.body);

  return agent;
};

export { serve };
