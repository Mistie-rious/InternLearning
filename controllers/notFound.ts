import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
res.status(404).json({code: 404, status: false, message: "Route not found"});
}

export default notFound