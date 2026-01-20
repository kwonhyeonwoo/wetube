import type { Response, Request } from "express";

let videos = [
    {
        id:"a",
        title:"video one",
        content:"첫번 째 비디오",
    },
    {
        id:"b",
        title:"video one",
        content:"첫번 째 비디오",
    },
    {
        id:"c",
        title:"video one",
        content:"첫번 째 비디오",
    }
]

export const handleVideos = async(req:Request,res:Response)=>{
    return res.json(videos);
}


export const handleVideoUpload = async (req: Request, res: Response) => { };

export const handleVideoEdit = async (req: Request, res: Response) => { 
    const {id} = req.params;
    console.log('id',id)
    const {title} :{title:string} = req.body;
    console.log('title',title)
    const filter = videos.filter((video)=>{
        if (video.id === id) {
            return video.title = title;
        }
    });
    console.log('filter',filter)
    return res.json(filter);
};

export const handleVideoDelete = async (req: Request, res: Response) => { };

export const handleVideoWatch = async (req: Request, res: Response) => {
    const {id} = req.params;
    const videoFilter = videos.filter((video)=>{
        const filterVideo = video.id === id ;
        return filterVideo
    });
    return res.json(videoFilter)
 }