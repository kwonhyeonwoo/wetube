import type { Response, Request } from "express";
import User from "../models/User.js";
import ShortComment from "../models/ShortComment.js";

export const postShortComment = async (req: Request, res: Response) => {
    try {
        const {
            body: { comment },
            session: { userId },
            params: { shortsId }
        } = req;
        const user = await User.findById(userId);
        if (!comment) {
            return res.status(400).json({
                status: false,
                message: "댓글을 찾을 수 없습니다."
            })
        }
        if (!user) {
            return res.status(400).json({
                status: false,
                message: "회원을 찾을 수 없습니다."
            })
        };
        if (!shortsId) {
            return res.status(400).json({
                status: false,
                message: "쇼츠를 찾을 수 없습니다."
            })
        };
        const newComment = await ShortComment.create({
            comment,
            owner: userId,
            shorts: shortsId,
        });
        user?.shortsComments.push(newComment._id);
        await user?.save();
        return res.status(200).json({
            status: true,
            message: "댓글을 생성하였습니다."
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message || "서버 에러입니다."
        })
    }
}
export const deleteShortComment = async (req: Request, res: Response) => {
    try {
        const {
            params: { shortsId },
            session: { userId }
        } = req;
        if (!shortsId || !userId) {
            return res.status(400).json({
                status: false,
                message: "쇼츠를 찾을 수 없습니다."
            })
        }
        const shortsComment = await ShortComment.findById(shortsId);
        if (!shortsComment) {
            return res.status(400).json({
                status: false,
                message: "댓글을 찾을 수 없습니다."
            })
        }
        if (shortsComment.owner.toString() !== userId) {
            return res.status(400).json({
                status: false,
                message: "댓글을 삭제할 수 없습니다."
            })
        }
        await ShortComment.findByIdAndDelete(shortsId);
        return res.status(200).json({
            status: true,
            message: "댓글을 삭제하였습니다."
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message || "서버 에러입니다."
        })
    }
}
export const getShortComment = async (req: Request, res: Response) => {
    try {
        const comments = await ShortComment.find();
        return res.status(200).json({
            status: true,
            comments,
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message || "서버 에러입니다."
        })
    }
}