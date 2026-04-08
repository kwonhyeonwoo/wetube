import { application, type Request, type Response } from "express";
import fetch from "node-fetch";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import type { IUserResponse } from "User";
import Video from "../models/Video.js";

export const postUserLogin = async (req: Request, res: Response) => {
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
    console.log('session', req.session);
    return res.status(200).json({
        status: true,
        message: "로그인 성공 !"
    })
};

export const postUserAccount = async (req: Request, res: Response) => {
    try {
        const { name, email, password, nickName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);
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
            password: hashedPassword,
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

export const getGithubLogin = async (req: Request, res: Response) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const params = {
        client_id: process.env.GITHUB_CLIENT_ID as string,
        allow_signup: "false",
        scope: "read:user user:email",
    }
    const queryString = new URLSearchParams(params).toString();
    return res.redirect(`${baseUrl}?${queryString}`);
};

export const getGithubCallback = async (req: Request, res: Response) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GITHUB_CLIENT_ID as string,
        client_secret: process.env.GITHUB_CLIENT_SECRET as string,
        code: String(req.query.code),
    }
    const queryString = new URLSearchParams(config).toString();
    const url = `${baseUrl}?${queryString}`;
    const tokenData = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    });
    const tokenResponse = (await tokenData.json()) as { access_token?: string; error?: string };
    if (tokenResponse) {
        const apiUrl = "https://api.github.com/user";
        const userRequest = await fetch(apiUrl, {
            headers: {
                Authorization: `token ${tokenResponse.access_token}`
            }
        });
        const emailRequest = await fetch(`${apiUrl}/emails`, {
            headers: {
                Authorization: `token ${tokenResponse.access_token}`
            }
        });
        const emailData = (await emailRequest.json()) as { email: string; verified: boolean; primary: boolean }[];
        const githubEmail = emailData.find(
            email => email.verified === true && email.primary === true
        );
        const userResponse = await userRequest.json() as IUserResponse;
        if (!githubEmail) {
            return res.status(400).json({
                state: false,
                message: "이메일이 인증되지 않습니다."
            })
        };

        const existUser = await User.findOne({ email: githubEmail.email })
        // user db에 email이 있으면 ?
        if (existUser) {
            req.session.loggdein = true;
            req.session.userId = existUser._id.toString();
            return res.status(200).json({
                state: true,
                message: "로그인 성공!",
            })
        } else {
            await User.create({
                name: userResponse.name,
                email: githubEmail.email,
                social: Number(userResponse.id),
            })
            return res.status(200).json({
                state: true,
                message: "회원가입 성공!",
            })
        }
    }
}

export const putUserEdit = async (req: Request, res: Response) => {
    const { session: { userId },
        body: { email, name, nickName },
        file,
    } = req;
    // 1. 나를 제외한 다른 사람 중에 이메일이나 닉네임이 겹치는지 확인
    const existUser = await User.exists({
        $or: [{ email }, { nickName }],
        _id: { $ne: userId } // $ne: Not Equal (내 ID는 빼고 찾아줘!)
    });
    if (existUser) {
        return res.status(400).json({
            state: false,
            message: "이미 존재하는 닉네임/이메일 입니다."
        })
    }
    await User.findByIdAndUpdate(userId, {
        avatar: file?.path || "",
        email,
        name
    });
    return res.status(200).json({
        state: true,
        message: "회원정보 수정 완료!"
    })
};

export const postUserPasswordChange = async (req: Request, res: Response) => {
    const { session: { userId } } = req;
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({
            state: false,
            message: "유저를 찾을 수 없습니다."
        })
    };

    const passwordConfirm = await bcrypt.compare(oldPassword, user.password);
    if (!passwordConfirm) {
        return res.status(400).json({
            state: false,
            message: "기존 비밀번호가 올바르지 않습니다."
        })
    };

    user.password = newPassword;
    await user.save();
    return res.status(200).json({
        state: true,
        message: "비밀번호 변경이 완료되었습니다."
    })
}

export const postUserProfile = (req: Request, res: Response) => {
    const files = req.file;
}


export const handleUserDelete = async (req: Request, res: Response) => { };

export const getProfile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    console.log('user', user)
    return res.status(200).json({
        state: true,
        message: id,
        user,
    })
};
