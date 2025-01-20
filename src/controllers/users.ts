import type { Request, Response, NextFunction } from "express";
import { User } from "../services";

const service_user = new User;

export async function handle_user_registration(req: Request, res: Response, next: NextFunction) {
    const { user } = req.body;

    try {
        const successful_registered_user = await service_user.register_user(user);
        res.status(201).json({
            message: `Welcome ${successful_registered_user}!`
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}