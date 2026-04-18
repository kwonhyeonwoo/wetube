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
      storage:ObjectId[];
      likeVideos:ObjectId[];
    }

    interface IUserResponse {
        name: string;
        id: string;
    }
}