import { mongoAgentConnector } from "../v1/connectors";
import { GetSuitableAgentsRequestData as RequestData } from "../v1/core/types";

const serve = async (requestData: RequestData) => {
  const agents = await mongoAgentConnector.findSimilarAgents(
    requestData.body.description
  );

  return agents;
};

export { serve };
