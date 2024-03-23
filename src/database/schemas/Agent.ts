import mongoose, { Schema, Document } from "mongoose";

interface IAgent extends Document {
  agentId: string;
  name: string;
  color: string;
  tagline: string;
  description: string;
  autobiography: string;
  prompt: string;
  embedding: number[];
}

const AgentSchema: Schema = new Schema({
  agentId: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  autobiography: { type: String, required: true },
  prompt: { type: String, required: true },
  embedding: { type: [Number], required: true },
});

const Agent = mongoose.model<IAgent>("Agent", AgentSchema);

export { IAgent, Agent };
