import { NextFunction, Response, Request } from "express";

import path from "path";
import {validateSpreadsheetExtension, validateVideoExtension} from "../validators/file";

import { uploadNewFile, signedUrl, deleteFileFromS3 } from "../utils/awsS3";

import File from "../models/content schema/video";

const uploadVideo = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { file } = req;

    if (!file) {
      res.statusCode = 400;
      throw new Error("No file uploaded");
    }

    const ext = path.extname(file.originalname);
    const isValidExt = validateVideoExtension(ext);

    if (!isValidExt) {
      res.statusCode = 400;
      throw new Error("Invalid file extension");
    }

    const Key = await uploadNewFile(file,ext)

    if(Key){
        const newFile = new File ({
            key: Key,
            size: file.size,
            mimetype: file.mimetype,
            createdBy: req.user._id
        })

        await newFile.save()

    }

    res.status(201).json({
        code: 201,
        status: true,
        message: 'Video uploaded successfully',
        data: {Key}
    })
  } catch (error) {
    next(error);
  }
};

const getSignedUrl = async (req:any, res:Response, next:NextFunction) => {
    try{
        const {key} = req.query
        const url = await signedUrl(key)

        res.status(201).json({
            code: 200,
            status: true,
            message: 'Get signed URL',
            data: {url}
        })
    }catch(error){
        next(error)
    }
}

const uploadSpreadsheet = async (req: any, res: Response, next: NextFunction) => {
    try{
        const {file} = req

        if(!file){
            res.statusCode = 400
            throw new Error('No file uploaded')
        }

        
    const ext = path.extname(file.originalname);
    const isValidExt = validateSpreadsheetExtension(ext);

    if (!isValidExt) {
      res.statusCode = 400;
      throw new Error("Invalid file extension");
    }

    const Key = await uploadNewFile(file,ext)

    if(Key){
        const newFile = new File ({
            key: Key,
            size: file.size,
            mimetype: file.mimetype,
            createdBy: req.user._id
        })

        await newFile.save()

    }

    res.status(201).json({
        code: 201,
        status: true,
        message: 'Spreasheet uploaded successfully',
        data: {Key}
    })
    }catch(error){


    }
}



export default {uploadVideo, getSignedUrl, uploadSpreadsheet}
