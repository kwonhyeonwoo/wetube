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
            category
        } = req.body;

        if (!file) {
            return res.status(400).json({
                status: false,
                message: "업로드 영상이 없습니다."
            });
        };
        const user = await User.findOne({ _id: userId });
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
            category,
            video: file.path,
        })
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