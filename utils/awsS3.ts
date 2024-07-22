import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import generateCode from './generateCode'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextFunction } from "express";

const awsRegion = process.env.AWS_REGION
const awsAccessKey = process.env.AWS_ACCESS_KEY
const awsBucketName = process.env.AWS_BUCKET_NAME
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const client = new S3Client({
    region: awsRegion,
    credentials: {
        accessKeyId: awsAccessKey || '',
        secretAccessKey: awsSecretAccessKey || '',
    }
})

const uploadNewFile = async (file: any, ext:any) => {
    const Key = `${generateCode(12)}_${Date.now()}${ext}`

    const params = {
        Bucket: awsBucketName,
        Key,
        Body: file.buffer,
        ContentType: file.mimetype
    }

    const command = new PutObjectCommand(params)

    try{
        await client.send(command)
        return Key
    }catch(error){
        console.log(error)
    }
}

const signedUrl = async (Key:any) => {
    const params = {
        Bucket: awsBucketName,
        Key
    }

    const command = new GetObjectCommand(params)

    try{
        const url = await getSignedUrl(client, command, {expiresIn: 60});
        return url
    }catch(error){
        console.log(error)
    }
}

const deleteFileFromS3 = async(Key: any) => {
    const params = {
        Bucket: awsBucketName,
        Key
    }

    const command = new DeleteObjectCommand(params)

    try{
        await client.send(command)
    }catch(error){
        console.log(error)
    }
}

export {uploadNewFile, deleteFileFromS3, getSignedUrl}