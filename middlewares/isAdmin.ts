import { Request, Response, NextFunction } from "express"

const isAdmin = (req: any, res: Response, next: NextFunction) => {
  console.log(req.user)
    if (req.user.role === 'admin' || req.user.role === 'instructor') {
       
      next();
    } else {
      res.status(403).json({ message: 'Permission Denied' });
    }
  };
  

export default isAdmin