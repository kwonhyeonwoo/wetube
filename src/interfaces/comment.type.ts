import type { ObjectId, Types } from "mongoose";

export interface IComment {
  comment: string;
  owner: Types.ObjectId;
  videos: Types.ObjectId[];
}