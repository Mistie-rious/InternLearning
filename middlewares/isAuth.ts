import { Request,Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')
const jwtsecret = process.env.JWT_SECRET;

const isAuth = (req: any, res: Response, next: NextFunction) => {
    try{
    const authorization = req.headers.authorization ? req.headers.authorization.split(" ") : null;
    const token = authorization && authorization.length > 1 ? authorization[1] : null;

    if (token){
        const payload = jwt.verify(token, jwtsecret);

        if (payload) {
            req.user = {
                _id: payload._id,
                email: payload.email,
                fullname: payload.fullname,
            }
            next()
         
        } else{
            res.statusCode = 401;
            throw new Error("Unauthorized");
        }
    }
    else{
        res.statusCode = 401;
        throw new Error("Token is required");
    }
}catch(error){
    next(error)

}
}

export default isAuth;