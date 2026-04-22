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
        categories,
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
            categories,
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
    const {
    file,
      body: { title, content, hashtags,categories },
      
    } = req;
    const video = await Video.exists({ _id: id });
    console.log('video',video)
    if (!video) {
        return res.status(404).json({
            status: "조회 실패",
            message: "수정할 수 없는 비디오 입니다."
        })
    };
    const updatedVideo = await Video.updateOne({ _id: id }, {
        title,
        content,
        video:file?.path,
        categories,
        hashtags: formatHashtags(hashtags),
    })
    console.log("video", updatedVideo);
    return res.json({
        status: "true",
        message:"비디오 수정이 완료되었습니다."
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
        const { keyword, category } = req.query;
        const query: any = {};

        if (keyword && keyword !== "undefined" && keyword !== "") {
            query.title = {
            $regex: new RegExp(keyword as string),
            $options: "i",
            };
        }
        if (category && category !== "undefined" && category !== "") {
            query.categories= category as string;
        }
        const videos = await Video.find(query)
            .sort({ createdAt: -1 })
            .populate("owner", "nickName");
        return res.status(200).json({
            status: true,
            videos,
        });
    }catch(error:any){
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}
export const findOneVideo = async (req: Request, res: Response) => {
  const { id: videoId } = req.params;
  const { userId } = req.session;
  const video = await Video.findOne({ _id: videoId }).populate({
    path: "owner",
    select: "nickName followers",
    populate: {
      path: "saveVideos",
      select: "_id",
    },
  }).lean();
  if (!video) {
    return res.status(404).json({
      state: false,
      message: "조회할 수 없는 비디오 입니다.",
    });
  }
  let isSaved = false;
  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      isSaved = user?.saveVideos.some((id) => id.toString() === videoId);
    }
  }
  const videoWithStatus = { ...video, isSaved };
  return res.status(200).json({
    state: true,
    video: videoWithStatus,
  });
}

export const postVideoLike = async(req:Request, res:Response)=>{
    try{
        const {id:videoId} = req.params;
        const {userId} = req.session;

        if(!videoId){
            return res.status(400).json({
                status:false,
                message:"존재하지 않는 비디오 입니다."
            })
        };

        // $pull -> 배열문서안에 해당 값이 있으면 삭제한다,
        // $addToSet -> 배열문서안에 해당 값이 없으면 추가해주고 같은 값이 있을 경우 아무런 반응이 없다.
        const video = await Video.findById(videoId);
        if(video?.likes.includes(userId)){
            await Video.findByIdAndUpdate(videoId,{$pull:{likes:userId}})
            await User.findByIdAndUpdate(userId,{$pull:{likeVideos:videoId}})
            return res.status(200).json({
                status:true,
                message:"좋아요를 해제 하였습니다."
            })
        }else{
            await Video.findByIdAndUpdate(videoId,{$addToSet:{likes:userId}});
            await User.findByIdAndUpdate(userId,{$addToSet:{likeVideos:videoId}});
            return res.status(200).json({
                status:true,
                message:"좋아요를 하였습니다."
            })
        }
    }catch(err:any){
        console.log('err',err)
        return res.status(500).json({
            status:false,
            message:err.message || "서버 에러입니다."
        })
    }
}
export const postVideoViews = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                status:false,
                message:"존재하지 않은 비디오 입니다."
            })
        };

        const updatedVideo = await Video.findByIdAndUpdate(
          id,
          {
            $inc: { "meta.views": 1 }, // ✨ 정답! $inc 명령어가 가장 바깥에 있고, 타겟 필드는 문자열로 지정
          },
          { new: true },
        );
        if(!updatedVideo){
            return res.status(400).json({
                status:false,
                message:"해당 비디오를 찾을 수 없습니다."
            })
        };
        return res.status(200).json({
            status:true,
            views:updatedVideo
        })
    }catch(error:any){
        console.log('err',error)
        return res.status(500).json({
            status:false,
            message:error.message || "서버 에러입니다."
        })
    }
}

export const postVideoSave = async(req: Request, res:Response)=>{
    try {
      const { id: videoId } = req.params;
      const {
        session: { userId },
      } = req;
      if (!videoId) {
        return res.status(400).json({
          status: false,
          message: "저장 할 비디오가 없습니다.",
        });
      }
      const user = await User.findById(userId);
      if(user?.saveVideos.includes(videoId)){
            await User.findByIdAndUpdate(userId,{
                $pull:{saveVideos:videoId}
            })
      }else{
        await User.findByIdAndUpdate(userId,{
            $addToSet:{saveVideos:videoId}
        })
      }
      return res.status(200).json({
        status: true,
        message: "영상을 저장하였습니다.",
      });
    } catch (error: any) {
      return res.status(500).json({
        status: false,
        message: error.message || "서버 에러 입니다.",
      });
    }
}

export const getVideoSave = async(req:Request, res:Response)=>{
    try{
        const {userId} = req.session;
        const user = await User.findById(userId).select("saveVideos").populate({
            path: "saveVideos",
            populate:{
                path:"owner",
                select:"nickName"
            }
        });
        console.log("save video", user);
        return res.status(200).json({
            status:true,
            videos:user ? user.saveVideos : [],
        })
    }catch(error:any){
        console.log('error',error)
        return res.status(500).json({
            status:false,
            message:error.message || "서버 에러입니다."
        })
    }
}