import { MongoError } from "../../api/core/models/errors";
import { OpenAIMessage } from "../../api/core/types";
import { Session, ISession } from "../../api/database/schemas";
import { Logger } from "../../api/utils";

const logger = Logger.new("MongoSessionConnector");

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
  sessionMessages: OpenAIMessage[]
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
    const userMessage: OpenAIMessage = {
      role: "user",
      content: prompt,
    };

    const aiMessage: OpenAIMessage = {
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

const updateSummary = async (summary: string, session: ISession) => {
  logger.log(
    "updateSummary",
    `Updating summary for session with sessionId ${session.sessionId}`
  );

  try {
    session.summary = summary;

    await session.save();

    return session;
  } catch (error) {
    logger.error("updateSummary", error);
    throw new MongoError(`Error updating summary (${error})`);
  }
};

export {
  createSession,
  getSession,
  updateSessionMessages,
  addMessagesExchangeToSession,
  updateSummary,
};
