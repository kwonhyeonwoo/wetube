import type { NextFunction, Request, Response } from "express";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
        console.log('req.session', req.session);
        console.log('user id', req.session.userId)
        next()
    } else {
        return res.status(401).json({
            status: false,
            message: "로그인 후 이용해주세요."
        })
    }
}