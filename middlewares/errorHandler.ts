import { NextFunction, Request, Response } from "express";

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
 const code = res.statusCode !== 200 ? res.statusCode : 500;

res.status(code).json({
    code,
    status: false,
    message: error.message,
    stack: error.stack
})
}

export default errorHandler