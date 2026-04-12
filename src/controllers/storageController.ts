import type { Request, Response } from "express";

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
    } catch (error: any) {
        return res.status(500).json({
            status: false,
            message: error.response.message,
        })
    }
}
export const getStorage = async (req: Request, res: Response) => {

};

export const deleteStorage = async () => {

};
export const putStorage = async () => {

}