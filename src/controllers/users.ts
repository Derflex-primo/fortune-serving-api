import { Request, Response, NextFunction } from "express";
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
            message: "Users fetched succesfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
};

export async function handle_get_user(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const data = await service.get_user(id);
        if (!data) {
            res.status(400).json({
                status: "failed",
                message: "User does not exist",
                data: null
            })
            return;
        }

        res.status(201).json({
            status: "ok",
            message: "User fetched succesfully",
            data: data
        })
        next()
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}

export async function handle_update_user(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { user } = res.locals;
    try {
        const data = await service.update_user(id, user);

        if (!data) {
            res.status(400).json({
                status: "failed",
                message: "User does not exist",
                data: null
            })
            return;
        }

        res.status(201).json({
            status: "ok",
            message: "User updated succesfully.",
            data: data
        })
        next()
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
};


export async function handle_delete_user(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const data = await service.delete_user(id);

        if (!data) {
            res.status(400).json({
                status: "failed",
                message: "User does not exist",
                data: null
            })
            return;
        }

        res.status(201).json({
            status: "ok",
            message: "User deleted succesfully",
            data: null,
        })
        next()
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}

export async function handle_user_registration(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: UserRegistration } = req.body;

    try {
        const data = await service.register(user);
        res.status(201).json({
            status: "ok",
            message: "User registered successfully.",
            data: data,
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
};