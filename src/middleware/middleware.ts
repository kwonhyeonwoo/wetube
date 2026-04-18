import type { NextFunction, Request, Response } from "express";
import multer from "multer";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        return res.status(401).json({ status: false, message: "로그인 후 이용해주세요." });
    }
}

export const avatarUploadMiddleware = multer({
    dest: "uploads/avatars/",
    limits: {
        fileSize: 10000000
    }
});

export const videoUploadMiddleware = multer({
    dest: "uploads/videos/",
    limits: {
        fileSize: 10000000
    }
});

export const shortsUploadMiddleware = multer({
    dest: "uploads/shorts/",
    limits: {
        fileSize: 10000000
    }
});

export const storageUploadMiddleware = multer({
    dest: "uploads/storage/",
    limits: {
        fileSize: 10000000
    }
})