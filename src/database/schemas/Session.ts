import mongoose, { Schema, Document } from "mongoose";
import OpenAI from "openai";
import { Message } from "../../core/types";

interface ISession extends Document {
  sessionId: string;
  userId?: string;
  context: string;
  messages: Message[];
}

const SessionSchema: Schema = new Schema({
  sessionId: { type: String, required: true, unique: true },
  userId: { type: String, required: false },
  context: { type: String, required: true },
  messages: [
    {
      role: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
});

const Session = mongoose.model<ISession>("Session", SessionSchema);

export { ISession, Session };
