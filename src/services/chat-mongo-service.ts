import { MongoError } from "../core/models/errors";
import { Message } from "../core/types";
import { Session, ISession } from "../database/schemas";
import { Logger } from "../utils/logger";

const logger = Logger.new("ChatMongoService");

const createSession = async (sessionId: string) => {
  logger.log(
    "createSession",
    `Creating new session with sessionId ${sessionId}`
  );

  const session = new Session({
    sessionId,
    context: "You are an AI assistant. Please respond only in markdown.",
    messages: [],
  });

  try {
    await session.save();
  } catch (error) {
    throw new MongoError(`Error creating session (${error})`);
  }

  return session;
};

const getSession = async (sessionId: string): Promise<ISession> => {
  logger.log("getSession", `Retrieving session with sessionId ${sessionId}`);

  try {
    const session = await Session.findOne({ sessionId }).exec();

    if (!session) {
      throw new MongoError(`Session with sessionId ${sessionId} not found`);
    }

    return session;
  } catch (error) {
    logger.error("getSession", error);
    throw new MongoError(`Error retrieving session (${error})`);
  }
};

const updateSessionMessages = async (
  session: ISession,
  sessionMessages: Message[]
) => {
  logger.log(
    "updateSessionMessages",
    `Updating session with:\n- SessionId:\n ${
      session.sessionId
    }\n- Messages:\n${sessionMessages.join("\n")}`
  );

  try {
    session.messages = sessionMessages;

    await session.save();

    return session;
  } catch (error) {
    logger.error("updateSessionMessages", error);
    throw new MongoError(`Error updating session messages (${error})`);
  }
};

const addMessagesExchangeToSession = async (
  session: ISession,
  prompt: string,
  response: string
) => {
  logger.log(
    "addMessagesToSession",
    `Adding message to session with sessionId ${session.sessionId}`
  );

  try {
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

    return session;
  } catch (error) {
    logger.error("addMessagesToSession", error);
    throw new MongoError(`Error adding messages to session (${error})`);
  }
};

export {
  createSession,
  getSession,
  updateSessionMessages,
  addMessagesExchangeToSession,
};
