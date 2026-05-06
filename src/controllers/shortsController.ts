import type { Request, Response } from "express";
import Shorts from "../models/Short.js";
import { formatHashtags } from "../lib/lib.js";
import User from "../models/User.js";

export const postShorts = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { file } = req;
        const {
            title,
            content,
            hashtags,
            categories
        } = req.body;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "로그인이 필요합니다."
            })
        }
        if (!file) {
            return res.status(400).json({
                status: false,
                message: "업로드 영상이 없습니다."
            });
        };
        const user = await User.findById({ _id: userId });
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "회원을 찾을 수 없습니다."
            })
        };

        const newVideo = await Shorts.create({
            title,
            content,
            hashtags: formatHashtags(hashtags),
            categories,
            shorts: file.path,
            meta: {
                views: 0,
                rating: 0,
            },
            owner: userId,
        });
        user.shorts.push(newVideo._id);
        await user.save();
        return res.status(200).json({
            stauts: true,
            message: "쇼츠 생성 완료",
            data:newVideo,
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.response.data,
        })
    }
}

export const getShorts = async (req: Request, res: Response) => {
    try {
        const {userId} = req.session;
        const shorts = await Shorts.find().populate('owner').lean();
        const user = await User.findById(userId);
        const data = shorts.map((short)=>{
            return{
                ...short,
                isShortSaved:user?.saveShorts.some((id)=>id.toString() === short._id.toString()),
                isLiked: user?.likeShorts.some((id)=>id.toString()===short._id.toString()) ,
            }
        })
        return res.status(200).json({
            status: true,
            data,
        });
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.response.message,
        })
    }
}
export const deleteShorts = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                status: false,
                message: "쇼츠를 찾을 수 없습니다."
            })
        }
        await Shorts.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            status: true,
            message: "쇼츠를 삭제하였습니다."
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.reponse.message,
        })
    }
}

export const getUserShorts = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "ID를 찾을 수 없습니다."
            })
        };
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.response.message,
        })
    }
}
export const postLikeShorts = async (req: Request, res: Response) => {
    try {
        const {
            session: { userId },
            params: { shortsId }
        } = req;
        if (!shortsId) {
            return res.status(400).json({
                status: false,
                message: "댓글을 찾을 수 없습니다."
            })
        };
        const comment = await Shorts.findById(shortsId);
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "회원을 찾을 수 없습니다."
            })
        };
        const isLiked = comment?.likes.some((id)=>id.toString() === userId);

        if (isLiked) {
          await Shorts.findByIdAndUpdate(shortsId, {
            $pull: { likes: userId },
          });
          await User.findByIdAndUpdate(userId, {
            $pull: { likeShorts: shortsId },
          });
          return res.status(200).json({
            status: true,
            message: "좋아요를 취소하였습니다.",
          });
        } else {
          await Shorts.findByIdAndUpdate(shortsId, {
            $addToSet: { likes: userId },
          });
          await User.findByIdAndUpdate(userId, {
            $addToSet: { likeShorts: shortsId },
          });
          return res.status(200).json({
            status: true,
            message: "좋아요를 하였습니다.",
          });
        }

    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message || "서버 에러입니다."
        })
    }
}