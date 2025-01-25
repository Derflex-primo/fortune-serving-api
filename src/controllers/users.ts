import type { Request, Response, NextFunction } from "express";
import { Pagination, UserRegistration } from "../types";
import { ServiceUser } from "../services";

const service = new ServiceUser();

export async function handle_get_all_user(req: Request, res: Response, next: NextFunction) {
    const { limit, next_page, order }: Partial<Pagination> = req.query;

    const pagination = {
        limit: limit,
        next_page: next_page,
        order: order,
    };

    try {
        const data = await service.get_all_users(pagination)
        const users = data && data.users || [];

        if (users && users.length === 0) {
            res.status(200).json({
                status: "ok",
                mesage: "No users found",
                data: []
            })
            return;
        }

        res.status(200).json({
            status: "ok",
            message: "Users fetched succesfully",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
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
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
};