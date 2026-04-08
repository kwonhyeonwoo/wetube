declare module "User" {
    interface IUser {
        name: string;
        email: string;
        password: string;
        nickName: string;
        social: number;
        avatar: string;
        createdAt: Date;
        updatedAt: Date;
        videos: ObjectId[]
    }

    interface IUserResponse {
        name: string;
        id: string;
    }
}