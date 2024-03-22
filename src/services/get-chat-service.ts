import { v4 as uuid } from "uuid";
import { mongoSessionConnector } from "../connectors";

const serve = async () => {
  const sessionId = uuid();

  await mongoSessionConnector.createSession(sessionId);

  return sessionId;
};

export { serve };
