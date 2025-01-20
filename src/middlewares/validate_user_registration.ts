import { Request, Response, NextFunction } from "express";
import { User } from "../@types";
import { validate_user_object } from "../utils";

export default async function validate_user_registration(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: Partial<User> } = req.body;

    try {

    const validation = validate_user_object(user)

    } catch (error) {
        
    }

}