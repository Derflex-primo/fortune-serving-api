import type { Request, Response, NextFunction } from "express";
import { UserRegistration } from "../types";
import { ServiceUser } from "../services";

export default async function handle_user_registration(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: UserRegistration } = req.body;

    const service = new ServiceUser();

    try {
        const successful_registered_user = await service.register(user);
        res.status(201).json({
            message: "User registered successfully.",
            user: successful_registered_user
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
}