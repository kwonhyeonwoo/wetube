export type Category =
  | "movie"
  | "music"
  | "product-design"
  | "building"
  | "game"
  | "live"
  | "cooking"
  | "recents";

export interface IVideo {
  video: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  hashtags: string[];
  categories: Category;
  meta: {
    views: number;
    rating: number;
  };
  owner: ObjectId;
}