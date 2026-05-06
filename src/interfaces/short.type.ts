import type { ObjectId } from "mongoose";

export interface IShorts {
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
    owner: ObjectId;
    comments: ObjectId[];
    likes: ObjectId[];
}

export interface IShortsComment {
    comment: string;
    owner: ObjectId;
    shorts: ObjectId;
    createdAt: Date;
}