import { openAIConnector } from "../../api/connectors";
import { mongoAgentConnector } from "../connectors";
import { GetSuitableAgentsRequestData } from "../core/types";

const serve = async (requestData: GetSuitableAgentsRequestData) => {
  const queryVector = await openAIConnector.generateEmbedding(
    requestData.body.description
  );
  const agents = await mongoAgentConnector.findSimilarAgents(queryVector);

  return agents;
};

export { serve };
