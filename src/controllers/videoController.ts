import type { Response, Request } from "express";
import Video from "../models/Video.js";
import { formatHashtags } from "../lib/lib.js";

export const handleVideoUpload = async (req: Request, res: Response) => {
    const {
        title,
        content,
        hashtags
    } = req.body;
    await Video.create({
        title,
        content,
        hashtags: formatHashtags(hashtags),
    });
   
    return res.json({
        status:"성공",
        message:"비디오를 생성하였습니다."
    });
};

export const handleVideoEdit = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {title,content,hashtags} = req.body
    const video = await Video.exists({_id:id});
    console.log('check',video);
    console.log('_id',id)
    if(!video){
        return res.json({
            status:"조회 실패",
            message:"수정할 수 없는 비디오 입니다."
        })
    } ;
    await Video.updateOne({_id:id},{
        title,
        content,
        hashtags:formatHashtags(hashtags),
    })
    return res.json({
        status:"true",
        data:video,
    });
};
export const handleVideoFind = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;
        
        const video = await Video.findById(id);
        if(!video){
            return res.json({
                status:"실패",
                message:"조회할 수 없는 비디오 업니다."
            })
        }
        return res.json(video)
    }catch(err){
        return res.json({
            status:"falied",
            message:err
        })
    }
}
export const handleVideoDelete = async (req: Request, res: Response) => { };

export const handleVideoWatch = async (req: Request, res: Response) => {
  }