import type { Category } from "../@types/video.js";
import { Types } from "mongoose";

export interface ShortSchema {
    title: string;
    content: string;
    shorts: string;
    hashtags: string[];
    categories: string;
    meta: {
        views?: number;
        rating?: number;
    };
    createdAt: Date;
    updatedAt: Date;
    owner: Types.ObjectId;
}