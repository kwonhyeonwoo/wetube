import type { Response, Request } from "express";
import Video from "../models/Video.js";
import { formatHashtags } from "../lib/lib.js";

<<<<<<< HEAD
let videos = [
    {
        id:"a",
        title:"video one",
        content:"첫번 째 비디오",
    },
    {
        id:"b",
        title:"video one",
        content:"첫번 째 비디오",
    },
    {
        id:"c",
        title:"video one",
        content:"첫번 째 비디오",
    }
]

export const handleVideos = async(req:Request,res:Response)=>{
    return res.json(videos);
}


export const handleVideoUpload = async (req: Request, res: Response) => { };

export const handleVideoEdit = async (req: Request, res: Response) => { 
    const {id} = req.params;
    console.log('id',id)
    const {title} :{title:string} = req.body;
    console.log('title',title)
    const filter = videos.filter((video)=>{
        if (video.id === id) {
            return video.title = title;
        }
    });
    console.log('filter',filter)
    return res.json(filter);
};
=======
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
>>>>>>> dbf3f643eff491cdaca4d20ea17ff68353c7b2c5

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

export const handleVideoWatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    const videoFilter = videos.filter((video)=>{
        const filterVideo = video.id === id ;
        return filterVideo
    });
    return res.json(videoFilter)
 }