import type { Request, Response, NextFunction } from "express";
import { UserRegistration } from "../types";
import { ServiceUser } from "../services";

const service = new ServiceUser();

export async function handle_get_all_user(req: Request, res: Response, next: NextFunction) {
    const { limit, next_page, prev_page } = req.query;

    const pagination = {
        limit: limit as string | undefined,
        next_page: next_page as string | undefined,
        prev_page: prev_page as string | undefined
    }

    try {
        const users = await service.get_all_users(pagination)

        if (users.length === 0) {
            res.status(200).json({
                status: "ok",
                mesage: "No users found",
                data: []
            })
        }

        res.status(200).json({
            status: "ok",
            message: "Users fetched succesfully",
            data: users
        })

    } catch (error) {
        console.error(error)
        next(error)
    }
};

export async function handle_user_registration(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: UserRegistration } = req.body;

    try {
        const successful_registered_user = await service.register(user);
        res.status(201).json({
            status: "ok",
            message: "User registered successfully.",
            data: successful_registered_user,
        })
    } catch (error) {
        console.error(error)
        next(error)
    }
};