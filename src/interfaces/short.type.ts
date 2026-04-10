import type { ObjectId } from "mongoose";
import type { Category } from "../@types/video.js";

export interface ShortSchema {
  video: string;
  title: string;
  content: string;
  hashtags: string[];
  category:Category;
  createdAt: Date;
  updatedAt: Date;
  meta: {
    views: number;
    rating: number;
  };
  owner: ObjectId;
}