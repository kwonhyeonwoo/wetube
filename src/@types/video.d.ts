export interface IVideo {
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