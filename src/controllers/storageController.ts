import type { Request, Response } from "express";
import User from "../models/User.js";
import { Storage } from "../models/Storage.js";

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
export const getStorage = async (req: Request, res: Response) => {

};

export const deleteStorage = async () => {

};
export const putStorage = async () => {

}