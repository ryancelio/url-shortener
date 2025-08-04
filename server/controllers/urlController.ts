import { dbGetUrlByID ,dbGetAllUrls, mongConnection, dbCreateUrl, dbGetUrlCount, dbUpdateUrl, dbDeleteUrl } from "../middleware/db.js"
import { nanoid } from "nanoid/non-secure"
import {Redirect} from "../types/urls.js"

// @Desc    Get All Urls
// @Route   GET /api/urls/
export const getAllUrls = async (req: any,res: any,next: any) =>{

    const urls = await dbGetAllUrls()
    
    res.status(200).json(urls);
}
// @Desc    Get Url By ID
// @Route   GET /api/urls/:id
export const GetUrlByID = async (req: any,res: any, next: any) => {
    const id = req.params.id;
    const url = await dbGetUrlByID(id);

    if(!url) {
        // res.status(404).json({Message: "Id not found"})   
        const error = new Error(`Post with id ${id} not found.`)
        //@ts-expect-error
        error.status = 404;
        
        return next(error);
    }
    res.status(200).json(url)
}
// @Desc    Get Count of Redirects
// @Route   GET /api/count/urls
export const GetUrlCount = async (req: any,res: any,next: any) => {

    const count = await dbGetUrlCount();

    if(!count) {
        return next(new Error("Failed to get count"))
    }

    res.status(200).json(count)
}

// @Desc    Create Redirect
// @Route   POST /api/urls/

export const createRedirect = async (req: any,res: any, next:any) => {
    const newRedirect: Redirect = {
        id: nanoid(),
        url: req.body.url,
    }

    if(!newRedirect.url) {
        const error = new Error("Error shortening link")
        //@ts-expect-error
        error.status = 400;
        return next(error)
    }
    dbCreateUrl(newRedirect);
    res.status(201).json(newRedirect)

}

// @Desc    Update Redirect
// @Route   PUT /api/urls/:id

export const updateRedirect = async (req: any,res: any, next: any) => {
    const newRedirect: Redirect = req.body;

    console.log(`urlController updt: id: ${req.body.id} url:${req.body.url}`)

     if(!newRedirect) {
        // res.status(404).json({Message: "Id not found"})   
        const error = new Error(`Post not found.`)
        //@ts-expect-error
        error.status = 404;
        
        return next(error);
    }

    try{
        dbUpdateUrl(newRedirect)
        res.status(200).json(newRedirect)
    }catch(error: any) {
        error.status = 500;
        res.status(error.status);
    }

}

// @Desc    Delete Redirect
// @Route   DELETE /api/urls/:id

export const deleteRedirect = async (req: any,res: any,next: any) => {
    const redirectId = req.params.id
    console.log(req)
    if(!redirectId){
        const error = new Error("Invalid Redirect!")
        //@ts-ignore
        error.status = 404;

        return next(error)
    }
    try{
        dbDeleteUrl(redirectId)
        res.status(200).json(redirectId)
    }catch(error:any){
        error.status = 500;
        res.status(error.status && 500)
    }
}