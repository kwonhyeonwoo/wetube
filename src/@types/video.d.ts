export interface IVideo {
    video: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    hashtags: string[];
    meta: {
        views: number;
        rating: number
    }
}