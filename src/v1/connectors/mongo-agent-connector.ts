import { MongoError } from "../../api/core/models/errors";
import { v4 as uuid } from "uuid";
import { Agent, IAgent } from "../../api/database/schemas";
import { Logger } from "../../api/utils/logger";
import { openAIConnector } from "../../api/connectors";
import { mongodb } from "../../api/database";

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

const findSimilarAgents = async (query: string) => {
  try {
    const agents = await collection
      .aggregate<IAgent>([
        {
          $search: {
            index: "embedding",
            text: {
              query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ])
      .toArray();

    return agents;
  } catch (error) {
    console.error(error);
  }
};

const getAgentById = async (agentId: string) => {
  return await collection.findOne({ agentId });
};

export { createAgent, findSimilarAgents, getAgentById };
