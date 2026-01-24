import type { Response, Request } from "express";
import Video from "../models/Video.js";
import { formatHashtags } from "../lib/lib.js";

export const handleVideoUpload = async (req: Request, res: Response) => {
    const {
        title,
        content,
        hashtags
    } = req.body;
    const newVideo = new Video({
        title,
        content,
        hashtags: formatHashtags(hashtags),
        createdAt: new Date(),
        meta: {
            views: 0,
            rating: 0,
        }
    });
    console.log('upload video', newVideo);
    return res.json(newVideo);
};

export const handleVideoEdit = async (req: Request, res: Response) => {

};
export const handleVideoFind = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find({});
        console.log('videos', videos);
        return res.json(videos); // 응답을 보내주어야 클라이언트가 무한 대기에 빠지지 않습니다.
    } catch (error) {
        console.error("데이터 조회 중 에러 발생:", error);
        return res.status(500).send("서버 에러");
    }
}
export const handleVideoDelete = async (req: Request, res: Response) => { };

export const handleVideoWatch = async (req: Request, res: Response) => { }