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
        return res.json({
            stauts: true,
            message: "쇼츠 생성 완료"
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.response.data
        })
    }
}

export const getShorts = async (req: Request, res: Response) => {
    try {
        const shorts = await Shorts.find();
        return res.status(200).json({
            status: true,
            shorts
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