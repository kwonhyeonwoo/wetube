import type { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export const handleUserLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({
            status: false,
            message: "존재하지 않은 이메일 입니다."
        })
    };
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        return res.status(400).json({
            status: false,
            message: "비밀번호가 올바르지 않습니다."
        })
    }
    req.session.loggdein = true;
    req.session.userId = user._id.toString();
    console.log('id', req.session.userId)
    console.log('loggdein', req.session.loggdein)
    return res.status(200).json({
        status: true,
        message: "로그인 성공 !"
    })
};

export const handleUserAccount = async (req: Request, res: Response) => {
    try {
        const { name, email, password, nickName } = req.body;
        const exist = await User.exists({ $or: [{ email }, { nickName }] });
        if (exist) {
            return await res.status(400).json({
                status: "error",
                message: "이미 존재하는 이메일/닉네임 입니다."
            })
        }
        const newUser = await User.create({
            name,
            email,
            password,
            nickName
        })
        return res.status(200).json(newUser);
    } catch (error) {
        return res.status(500).json({
            status: "error",
            error,
        });
    }
}

export const handleUserEdit = async (req: Request, res: Response) => { };

export const handleUserDelete = async (req: Request, res: Response) => { };

export const handleUserProfile = async (req: Request, res: Response) => {
    return await res.send(req.params.id)
};