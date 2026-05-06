import { type Request, type Response } from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Video from "../models/Video.js";
import Shorts from "../models/Short.js";
import type { IUserResponse } from "../interfaces/user.type.js";

export const getMe = async (req: Request, res: Response) => {
    try {
        if (!req.session.userId && req.session.loggdein) {
            return res.status(401).json({
                status: false,
                messge: "로그인이 필요합니다."
            })
        };
        const user = await User.findById(req.session.userId);
        if (!user) return res.status(400).json({ status: false, message: "유저를 찾을 수 없습니다." });
        const stats = {
          followerCount: user.followers.length,
          videoCount: user.videos.length,
        };
        return res.status(200).json({
            status: true,
            user: {
                uid: user._id,
                nickName: user.nickName,
                email: user.email,
                avatar: user.avatar,
                name: user.name,
                introduction:user.introduction,
                stats,
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message,
        })
    }
}
export const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: false,
      message: "프로필을 조회할 수 없습니다.",
    });
  }
  const user = await User.findById(id);
  if(!user) return res.status(400).json({status:false,message:"유저를 조회할 수 없습니다."})
  const stats = {
    videoCount: user.videos.length,
    followerCount:user.followers.length
  }
  return res.status(200).json({
    status: true,
    user: {
      uid: user._id,
      nickName: user.nickName,
      email: user.email,
      avatar: user.avatar,
      name: user.name,
      introduction: user.introduction,
      stats,
    },
    stats
  });
};
export const postUserLogin = async (req: Request, res: Response) => {
    try{
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
        return res.status(200).json({
            status: true,
            message: "로그인 성공 !",
            data:{
                uid:user._id,
                name:user.name,
                email:user.email,
                nickName:user.nickName,
                avatar:user.avatar,
            }
        })
    }catch(error:any){
        console.log('error',error)
    }
};
export const postUserLogout = async (req: Request, res: Response) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.redirect('/error'); // 에러 처리
            }
            res.clearCookie('connect.sid');
            res.status(200).json({
                status: true,
                message: "로그아웃 완료"
            })
        });
    } catch (err: any) {
        return res.status(500).json({
            status: false,
            message: "서버 에러 입니다."
        })
    }
}
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
        body: { email, name, nickName, introduction },
        file,
    } = req;
    console.log('file', file?.path)
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
        avatar: file?.path,
        email,
        name,
        introduction,
        nickName
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



export const getUserVideos = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = Video.find({ owner: id }).sort({ createdAt: -1 });
        const userVideos = await query.populate('owner', 'name avatar nickName');
        return res.status(200).json({
            status: true,
            videos: userVideos,
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message,
        })
    }
}

export const getUserShorts = async(req:Request,res:Response)=>{
   try {
     const { id } = req.params;
     const userShorts = await Shorts.find({
       owner: new mongoose.Types.ObjectId(id as string),
     })
       .sort({ createdAt: -1 })
       .populate("owner"); 

       console.log('userShrots',userShorts)
     return res.status(200).json({
       status: true,
       shorts: userShorts,
     });
   } catch (error) {
     console.log("error", error);
     return res
       .status(500)
       .json({ status: false, message: "서버 에러가 발생했습니다." });
   }
}

export const postSaveVideo = async (req: Request, res: Response) => {
    try {
        const { id: videoId } = req.params;
        const { session: { userId } } = req;
        if (!videoId) {
            return res.status(400).json({
                status: false,
                message: "저장 할 비디오가 없습니다."
            })
        };
        const user = await User.findById(userId);
        if (user?.saveVideos.includes(videoId)) {
            await user.updateOne({ $pull: { saveVideos: videoId } });
            return res.status(200).json({
                status: false,
                message: "저장을 해제하였습니다."
            })
        } else {
            await user?.updateOne({ $push: { saveVideos: videoId } })
            return res.status(200).json({
                status: true,
                message: "영상을 저장하였습니다.",
            });
        }

    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.message || "서버 에러 입니다."
        })
    }
}

export const getUserSavedVideo = async(req:Request,res:Response)=>{
    try{
        const {userId} = req.session;
        console.log('first',userId)
        const user = await User.findById(userId).populate({
          path: "saveVideos", 
          populate: {
            path: "owner", 
          },
        });
        if (!user) {
          return res
            .status(404)
            .json({ status: false, message: "유저를 찾을 수 없습니다." });
        }
        return res.status(200).json({
            status:true,
            savedVideos:user?.saveVideos,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            status:false,
            message:"서버 에러 입니다."
        })
    }
}

export const userFollow = async (req: Request, res: Response) => {
    try {
        const {
            params: { id },
            session: { userId }
        } = req;
        if (userId === id) {
            return res.status(400).json({
                status: false,
                message: "자신을 팔로우 할 수 없습니다."
            });
        }
        const currentUser = await User.findById(userId); // 현재 로그인 한 유저
        const userToFollow = await User.findById(id) // 팔로우 할 대상
        if (!currentUser || !userToFollow) {
            return res.status(400).json({
                status: false,
                message: "회원을 찾을 수 없습니다."
            })
        };

        const isFollow = currentUser.following.includes(userToFollow._id)  // 이미 팔로우 하고 있는 경우
        if (isFollow) {
            await currentUser.updateOne({ $pull: { following: userToFollow._id } });
            await userToFollow.updateOne({ $pull: { followers: currentUser._id } });
            return res.status(200).json({
                status: true,
                message: "팔로우를 해제 하였습니다."
            })
        } else {
            await currentUser.updateOne({ $push: { following: userToFollow._id } });
            await userToFollow.updateOne({ $push: { followers: currentUser._id } });
            return res.status(200).json({
                status: true,
                message: "팔로우를 하였습니다."
            })
        }
    } catch (error: any) {
        console.log('follow err:', error);
        return res.status(500).json({
            status: false,
            message: "서버 에러입니다."
        })
    }
}

export const getFollowing = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const user = await User.findById(userId).populate(
            "following",
            "name avatar nickName",
        );
        if (!user) {
            return res.status(404).json({
                status: false,
                message: "유저 정보를 찾을 수 없습니다.",
            });
        }
        console.log("followers", user.following);
        return res.status(200).json({
            status: true,
            following: user.following,
        })
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: "서버 에러 입니다."
        })
    }
}

export const postShortsSave = async(req: Request, res:Response)=>{
    try{
      const {
        params: { id },
        session: { userId },
      } = req;

      const user = await User.findById(userId);
      const isSaveShorts = user?.saveShorts.some((shortId: any) => {
        const currentIdStr = (shortId._id || shortId).toString();
        return currentIdStr === id;
      });

      if (isSaveShorts) {
        await user?.updateOne({
          $pull: {
            saveShorts: id,
          },
        });
        return res.status(200).json({
          status: true,
          message: "저장을 취소하였습니다.",
        });
      } else {
        await user?.updateOne({
          $push: {
            saveShorts: id,
          },
        });
        return res.status(200).json({
          status: true,
          message: "쇼츠를 저장하였습니다.",
        });
      }
    }catch(error){  
        console.log('save shorts err',error)
    }
}