import { mongoAgentConnector } from "../connectors";
import { GetSuitableAgentsRequestData } from "../core/types";

const serve = async (requestData: GetSuitableAgentsRequestData) => {
  const agents = await mongoAgentConnector.findSimilarAgents(
    requestData.body.description
  );

  return agents;
};

export { serve };
