import Redis from "ioredis";
import { RedisError } from "../core/models/errors";

const redis = new Redis();

type MessageExchange = {
  userMessage: string;
  aiMessage: string;
};

/**
 * Adds a message exchange to the list for a given session ID.
 * @param sessionId The session ID.
 * @param messageExchange The message exchange to add.
 */
async function addMessagesToSession(
  sessionId: string,
  messageExchange: MessageExchange
): Promise<void> {
  try {
    const serialisedMessageExchange = JSON.stringify(messageExchange);
    await redis.rpush(sessionId, serialisedMessageExchange);
  } catch (error) {
    throw new RedisError("Failed to add messages for session");
  }
}

/**
 * Retrieves all messages for a given session ID.
 * @param sessionId The session ID.
 * @returns A list of messages.
 */
async function getMessagesForSession(sessionId: string): Promise<string[]> {
  try {
    return await redis.lrange(sessionId, 0, -1);
  } catch (error) {
    throw new RedisError("Failed to retrieve messages for session");
  }
}

export { addMessagesToSession, getMessagesForSession };
