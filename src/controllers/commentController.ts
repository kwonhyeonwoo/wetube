import type { Request, Response } from "express";
import { Comment } from "../models/Comment.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const postComment = async (req: Request, res: Response) => {
    try {
        const {
            body: { comment },
            params: { videoId },
            session: { userId }
        } = req;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "회원을 찾을 수 없습니다.",
            });
        }
        if (!comment) {
            return res.status(400).json({
                status: false,
                message: "댓글을 찾을 수 없습니다.",
            });
        };
        if (!videoId) {
            return res.status(400).json({
                status: false,
                message: "영상을 찾을 수 없습니다."
            })
        };
        const user = await User.findById(userId);
        const video = await Video.findById(videoId);
        // 1. comment model에 create 해준다.
        // 2. create 된  comment를 user, video model에 넣어준다
        // 3. return 해준다?
        const newComment = await Comment.create({
            comment,
            owner: userId,
            video: videoId,
        });
        user?.comments.push(newComment._id);
        video?.comments?.push(newComment._id);
        await user?.save();
        await video?.save();
        return res.status(200).json({
            status: true,
            message: "댓글을 생성하였습니다."
        })

    } catch (error: any) {
        console.log('error', error)
        return res.status(500).json({
            status: false,
            message: error.message || "서버 에러 입니다."
        })
    }
}

export const getComment = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({
                status: false,
                message: "댓글을 찾을 수 없습니다."
            })
        };

        const comment = await Comment.find({ video: videoId }).populate("owner", "nickName").sort({ createdAt: -1 });
        return res.status(200).json({
            status: true,
            comment
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "서버 에러입니다."
        })
    }
}