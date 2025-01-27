import { Request, Response, NextFunction } from "express";
import { User } from "../@codegen";

export default async function validate_update_user(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: Partial<User> } = req.body;

    try {
        let fields_to_update = {};

        if (user.full_name && typeof user.full_name === "string") {
            Object.assign(fields_to_update, { full_name: user.full_name })
        };

        if (user.phone_number && typeof user.phone_number === "string") {
            Object.assign(fields_to_update, { phone_number: user.phone_number })
        };

        if (user.email && typeof user.email === "string" && /\S+@\S+\.\S+/.test(user.email)) {
            Object.assign(fields_to_update, { email: user.email })
        };

        if (user.profile_image && typeof user.profile_image === "string") {
            Object.assign(fields_to_update, { profile_image: user.profile_image })
        };

        if (Object.values(fields_to_update).length === 0) {
            res.status(400).json({
                valid: false,
                message: "Nothing to update.",
            })
            return;
        };

        res.locals = { user: fields_to_update };
        next();
        return;
    } catch (error) {
        console.error("Error during update user:", error);
        res.status(500).json({ message: "An unexpected error occurred during udpate user." });
        return;
    }
} 