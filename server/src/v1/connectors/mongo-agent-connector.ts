import { MongoError } from "../../api/core/models/errors";
import { v4 as uuid } from "uuid";
import { Agent, IAgent } from "../../api/database/schemas";
import { openAIConnector } from "../../api/connectors";
import { mongodb } from "../../api/database";
import { Logger } from "../../api/utils";

const logger = Logger.new("MongoAgentConnector");

const collection = mongodb.getCollection<IAgent>("agents");

type Data = {
  name: string;
  color: string;
  tagline: string;
  description: string;
  autobiography: string;
  prompt: string;
};

const createAgent = async (data: Data) => {
  logger.log("createAgent", `Creating new agent with name ${data.name}`);

  const embedding = await openAIConnector.generateEmbedding(`
    ${data.name}
    ${data.tagline}
    ${data.description}
    ${data.autobiography}
    ${data.prompt}
  `);

  const agentId = uuid();

  const agent = new Agent({
    agentId,
    embedding,
    ...data,
  });

  try {
    await agent.save();
  } catch (error) {
    throw new MongoError(`Error creating agent (${error})`);
  }

  return agent;
};

const findSimilarAgents = async (queryVector: number[]) => {
  logger.log("findSimilarAgents", `Finding similar agents for query`);

  try {
    const agents = await collection
      .aggregate<IAgent>([
        {
          $vectorSearch: {
            index: "vector_index",
            path: "embedding",
            queryVector: queryVector,
            numCandidates: 150,
            limit: 5,
          },
        },
        {
          $addFields: {
            similarity: { $meta: "vectorSearchScore" },
          },
        },
        { $sort: { similarity: -1 } },
        { $match: { similarity: { $gte: 0.7 } } },
      ])
      .toArray();
    console.log(agents);
    return agents;
  } catch (error) {
    console.error(error);
  }
};

const getAgentById = async (agentId: string) => {
  return await collection.findOne({ agentId });
};

export { createAgent, findSimilarAgents, getAgentById };
