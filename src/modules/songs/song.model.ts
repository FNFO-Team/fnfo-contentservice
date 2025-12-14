import { Schema, model, Document } from "mongoose";

export interface ISong extends Document {
  name: string;
  audioUrl: string;
  chartUrl: string;
  createdAt: Date;
}

const SongSchema = new Schema<ISong>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  chartUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const SongModel = model<ISong>("Song", SongSchema);
