import type { Request, Response } from "express";
import User from "../models/User.js";
import { Storage } from "../models/Storage.js";
import mongoose from "mongoose";

export const postStorage = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const {
            body: {
                title,
                content
            },
            file
        } = req;
       
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                status:false,
                message:"유저를 찾을 수 없습니다."
            })
        };
        if(!file){
            console.log('durl?',file)
            return res.status(400).json({
                status:false,
                message:"파일을 찾을 수 없습니다."
            })
        };
        if(!userId){
            return res.status(400).json({
                status:false,
                message:"유저를 찾을 수 없습니다."
            })
        }
        const newStorage = await Storage.create({
            thumnail:file.path,
            title,
            content,
            owner:userId
        });
        user.storage.push(newStorage._id);
        await user.save();
        return res.status(200).json({
            status:true,
            message:"보관함을 생성하였습니다."
        })
    } catch (error: any) {
        console.log('error',error)
        return res.status(500).json({
            status: false,
            message: error.message,
        })
    }
}
export const getUserStorages = async (req: Request, res: Response) => {
    try{
        const {id} = req.params;

        // mongodb id 유효성 검사
        if(!mongoose.isObjectIdOrHexString(id)){
            return res.status(400).json({
                status:false,
                message:"유효하지 않은 회원 입니다."
            })
        }

        // objectId 타입변환
        const userObjectId = new mongoose.Types.ObjectId(id  as string);
        const storages = await Storage.find({owner:userObjectId });
        return res.status(200).json({
            status:true,
            storages
        })
    }catch(error:any){
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
};

export const getStorageVideos = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                status:false,
                message:"비디오를 찾을 수 없습니다."
            })
        };

        const storage = await Storage.findById({_id:id}).populate("owner","nickName");
        return res.status(200).json({
            status:true,
            storage
        })
    }catch(error:any){
        console.log('err',error)
        return res.status(500).json({
            status:false,
            message:error.message || "서버 에러 입니다."
        })
    }
}

export const deleteStorage = async () => {

};
export const putStorage = async () => {

}