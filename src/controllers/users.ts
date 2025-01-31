import { Request, Response, NextFunction } from "express";
import { Address } from "../@codegen";
import { Pagination, UserRegistration } from "../types";
import { ServiceUser } from "../services";

const service = new ServiceUser();

export async function handle_get_users(req: Request, res: Response, next: NextFunction) {
    const { limit, next_page, order }: Partial<Pagination> = req.query;

    const pagination = {
        limit: limit,
        next_page: next_page,
        order: order,
    };

    try {
        const data = await service.get_users(pagination)
        const users = data && data.users || [];

        if (users && users.length === 0) {
            res.status(200).json({
                status: "success",
                mesage: "No users found.",
                data: []
            })
            return;
        }

        res.status(200).json({
            status: "success",
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
            res.status(404).json({
                status: "failed",
                message: "User does not exist.",
                data: null
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "User fetched succesfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}

export async function handle_get_user_addresses(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const data = await service.get_user_addresses(id);

        if (!data || data.length === 0) {
            res.status(404).json({
                status: "failed",
                message: "No addresses found.",
                data: null
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "User addresses fetched succesfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
};

export async function handle_get_user_address(req: Request, res: Response, next: NextFunction) {
    const { id, address_id } = req.params;

    try {
        const data = await service.get_user_address(id, address_id);

        if (!data) {
            res.status(404).json({
                status: "failed",
                message: "No address found.",
                data: null
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "User address fetched succesfully.",
            data: data
        })
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
            res.status(404).json({
                status: "failed",
                message: "User does not exist.",
                data: null
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "User updated succesfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
};

export async function handle_update_user_address(req: Request, res: Response, next: NextFunction) {
    const { id, address_id } = req.params;
    const { address }: { address: Address } = req.body;

    try {
        const data = await service.update_user_address(id, address_id, address);

        if (!data) {
            res.status(404).json({
                status: "failed",
                message: "No address found.",
                data: null
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Address updated successfully",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}


export async function handle_delete_user(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const data = await service.delete_user(id);

        if (!data) {
            res.status(404).json({
                status: "failed",
                message: "User does not exist.",
                data: null
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "User deleted succesfully.",
            data: null,
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}

export async function handle_delete_user_address(req: Request, res: Response, next: NextFunction) {
    const { id, address_id } = req.params;

    try {
        const data = service.delete_user_address(id, address_id);

        if (!data) {
            res.status(404).json({
                status: "failed",
                message: "Address does not exist.",
                data: null
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Address deleted succesfully.",
            data: null,
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}

export async function handle_post_user(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: UserRegistration } = req.body;

    try {
        const data = await service.post_user(user);

        if (!data) {
            res.status(409).json({
                status: "failed",
                message: "User already exists.",
                data: data,
            })
            return;
        }

        res.status(201).json({
            status: "success",
            message: "User created successfully.",
            data: data,
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
};

export async function handle_post_user_address(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { address }: { address: Address } = req.body;

    try {
        const data = await service.post_user_address(id, address);

        if (!data) {
            res.status(409).json({
                status: "failed",
                message: "Address already exist.",
                data: data,
            })
            return;
        }

        res.status(201).json({
            status: "success",
            message: "Address created successfully.",
            data: data,
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}