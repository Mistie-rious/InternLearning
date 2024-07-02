import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError} from "express-validator";

const validate = async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const mappedErrors: { [key: string]: string } = {};

    if (errors.isEmpty()){
        next();
    }
    else{
        errors.array().map((error: any) => {
            mappedErrors[error.path] = error.msg;
        });

        res.status(400).json(mappedErrors)
    }
}

export default validate;