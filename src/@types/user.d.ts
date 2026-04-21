declare module "User" {
    interface IUser {
      name: string;
      email: string;
      password: string;
      nickName: string;
      social: number;
      avatar: string;
      introduction: string;
      createdAt: Date;
      updatedAt: Date;
      videos: ObjectId[];
      shorts: ObjectId[];
      storage: ObjectId[];
      likeVideos: ObjectId[];
      saveVideos:ObjectId[];
      comments:ObjectId[]
      following:objectId[] //내가 팔로우하는 사람들
      followers:objectId[]; //나를 팔로우하는 사람
    }

    interface IUserResponse {
        name: string;
        id: string;
    }
}