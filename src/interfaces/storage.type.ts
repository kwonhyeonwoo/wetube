import type { ObjectId } from "mongoose";

export interface IStorage {
    thumnail: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    owner: ObjectId;
    videos: ObjectId[];
}