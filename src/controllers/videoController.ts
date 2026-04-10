import type { Response, Request } from "express";
import Video from "../models/Video.js";
import { formatHashtags } from "../lib/lib.js";
import User from "../models/User.js";

export const postVideoUpload = async (req: Request, res: Response) => {
    const { userId } = req.session;
    const {file} = req;
    const {
        title,
        content,
        hashtags,
        category,
    } = req.body;
    if(!file){
        return res.status(400).json({
            status:false,
            message:"비디오 파일이 업로드 되지 않습니다."
        })
    }
    try{
        const user = await User.findById(userId);
        const newVideo = await Video.create({
            title,
            content,
            video: file.path,
            category,
            hashtags: formatHashtags(hashtags),
            owner: userId,
        });
        user?.videos.push(newVideo._id);
        await user?.save();
        return res.json({
            status: "성공",
            message: "비디오를 생성하였습니다."
        });
    }catch(error:any){
        console.log('err',error)
        return res.status(500).json({
            status:false,
            message:"서버오류"
        })
    }
};

export const putVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, hashtags } = req.body
    const video = await Video.exists({ _id: id });

    if (!video) {
        return res.status(404).json({
            status: "조회 실패",
            message: "수정할 수 없는 비디오 입니다."
        })
    };
    await Video.updateOne({ _id: id }, {
        title,
        content,
        hashtags: formatHashtags(hashtags),
    })
    console.log('실행')
    return res.json({
        status: "true",
        data: video,
    });
};
export const getFindOneVideo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const video = await Video.findById(id);
        if (!video) {
            return res.json({
                status: "실패",
                message: "조회할 수 없는 비디오 업니다."
            })
        }
        return res.json(video)
    } catch (err) {
        return res.json({
            status: "falied",
            message: err
        })
    }
}
export const deleteVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const exist = await Video.exists({ _id: id })
    if (!exist) {
        return res.status(404).json({
            status: false,
            message: "비디오를 찾을 수 없습니다."
        })
    };
    await Video.findOneAndDelete({ _id: id });
    return res.status(200).json({
        status: true,
        message: "비디오를 삭제하였습니다."
    })
};

export const getVideos = async(req:Request, res:Response)=>{
    try{
        const videos = await Video.find();
        return res.status(200).json({
            status:true,
            videos
        })
    }catch(error:any){
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

export const getSearchVideo = async (req: Request, res: Response) => {
    const { keyword } = req.query;
    if (!keyword) {
        return res.status(200).json({
            status: true,
            data: []
        });
    };

    const videos = await Video.find({
        title: { $regex: new RegExp(keyword as string), $options: "i" }
    });
    return res.status(200).json({
        status: true,
        data: videos
    });
};

export const findOneVideo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const video = await Video.findOne({_id:id}).populate('owner');
    if (!video) {
        return res.status(404).json({
            state: false,
            message: "조회할 수 없는 비디오 입니다."
        });
    };
    console.log('video', video)
    return res.status(200).json({
        state: true,
        video
    })
}