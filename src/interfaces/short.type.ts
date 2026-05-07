import type { ObjectId, Types } from "mongoose";
import type { IUser } from "./user.type.js";

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
    owner: Types.ObjectId | IUser;
    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
}

export interface IShortsComment {
    comment: string;
    owner: Types.ObjectId;
    shorts: Types.ObjectId;
    createdAt: Date;
}