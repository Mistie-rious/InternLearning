import { NextFunction, Request, Response } from "express";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
const code = res.statusCode ? res.statusCode : 500;

res.status(code).json({
    code,
    status: false,
    message: error.message,
    stack: error.stack
})
}

export default errorHandler