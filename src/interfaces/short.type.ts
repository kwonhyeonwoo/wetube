import type { Category } from "../@types/video.js";
import { Types } from "mongoose";

export interface ShortSchema {
    title: string;
    content: string;
    video: string;
    hashtags: string[];
    categories: string;
    meta: {
        views?: number;
        rating?: number;
    };
    createdAt: Date;
    updatedAt: Date;
    // 👇 Mongoose의 Types.ObjectId를 사용합니다.
    owner: Types.ObjectId; 
}