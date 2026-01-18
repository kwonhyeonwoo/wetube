import type { Request, Response } from "express";

export const handleUserLogin = async (req: Request, res: Response) => {

};

export const handleUserAccount = async (req: Request, res: Response) => {

}

export const handleUserEdit = async (req: Request, res: Response) => { };

export const handleUserDelete = async (req: Request, res: Response) => { };

export const handleUserProfile = async (req: Request, res: Response) => {
    console.log('id', req.params.id)
    return await res.send(req.params.id)
};