import type { Request, Response, NextFunction } from "express";
import { User } from "../services";

const service_user = new User;

export async function post_user(req: Request, res: Response, next: NextFunction) {
    const { user } = req.body;

    try {
        const successful_created_user = await service_user.create_user(user);
        res.status(201).json({
            message: `Welcome ${successful_created_user}!`
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}