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
    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
}

export interface ShortCommentSchema {
    comment: string;
    owner: Types.ObjectId;
    shorts: Types.ObjectId;
    createdAt: Date;
}