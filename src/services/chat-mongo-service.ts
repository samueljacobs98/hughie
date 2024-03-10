import { MongoError } from "../core/models/errors";
import { Message } from "../core/types";
import { Session, ISession } from "../database/schemas";
import { Logger } from "../utils/logger";

const logger = Logger.new("ChatMongoService");

const getSession = async (sessionId: string): Promise<ISession | null> => {
  logger.log("getSession", `Retrieving session with sessionId ${sessionId}`);

  try {
    const session = await Session.findOne({ sessionId }).exec();

    if (!session) {
      return null;
    }

    return session;
  } catch (error) {
    logger.error("getSession", error);
    throw new MongoError(`Error retrieving session (${error})`);
  }
};

const updateSessionMessages = async (
  sessionId: string,
  sessionMessages: Message[]
) => {
  logger.log(
    "updateSessionMessages",
    `Updating session with:\n- SessionId:\n ${sessionId}\n- Messages:\n${sessionMessages.join(
      "\n"
    )}`
  );

  try {
    const session = await Session.findOne({ sessionId: sessionId }).exec();

    if (!session) {
      return null;
    }

    session.messages = sessionMessages;

    await session.save();

    return session;
  } catch (error) {
    logger.error("updateSessionMessages", error);
    throw new MongoError(`Error updating session messages (${error})`);
  }
};

const addMessagesExchangeToSession = async (
  sessionId: string,
  prompt: string,
  response: string
) => {
  logger.log(
    "addMessagesToSession",
    `Adding message to session with sessionId ${sessionId}`
  );

  try {
    const session = await Session.findOne({ sessionId }).exec();

    if (!session) {
      return null;
    }

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    const aiMessage: Message = {
      role: "assistant",
      content: response,
    };

    session.messages.push(userMessage);
    session.messages.push(aiMessage);

    await session.save();

    return [userMessage, aiMessage];
  } catch (error) {
    logger.error("addMessagesToSession", error);
    throw new MongoError(`Error adding messages to session (${error})`);
  }
};

export { getSession, updateSessionMessages, addMessagesExchangeToSession };
