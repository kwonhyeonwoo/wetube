import type { ObjectId, Types } from "mongoose";
import type { IVideo } from "../@types/video.js";
import type { IShorts, IShortsComment } from "./short.type.js";

export interface IUser {
  name: string;
  email: string;
  password: string;
  nickName: string;
  social: number;
  avatar: string;
  introduction: string;
  createdAt: Date;
  updatedAt: Date;
  videos: Types.ObjectId[] | IVideo[];
  shorts: Types.ObjectId[] | IShorts[];
  storage: Types.ObjectId[] | IVideo[];
  likeVideos: Types.ObjectId[] | IVideo[];
  likeShorts:Types.ObjectId[] | IShorts[];
  saveVideos: Types.ObjectId[] | IVideo[];
  saveShorts: Types.ObjectId[];
  comments: Types.ObjectId[] | IVideo[];
  following: Types.ObjectId[] | IUser[]; //내가 팔로우하는 사람들
  followers: Types.ObjectId[]; //나를 팔로우하는 사람
  shortsComments: Types.ObjectId[] | IShortsComment[];
}
export interface IUserResponse {
    name: string;
    id: string;
  }