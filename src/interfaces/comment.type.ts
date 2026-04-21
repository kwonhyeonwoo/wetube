import type {  Types } from "mongoose";

export interface IComment {
  comment: string;
  owner: Types.ObjectId;
  video: Types.ObjectId;
  createdAt:Date;
}