import { Request, Response, NextFunction } from "express";
import { User } from "../@codegen";

export default async function validate_update_user(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: Partial<User> } = req.body;

    try {
        if (!user) {
            res.status(400).json({
                valid: false,
                message: "User object is required."
            })
            return;
        }

        let fields_update = {};

        if (user.full_name) {
            if (typeof user.full_name === "string") {
                Object.assign(fields_update, { full_name: user.full_name })
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Full name must be a non-empty string."
                })
                return;
            }
        }

        if (user.email) {
            if (typeof user.email === "string" && /\S+@\S+\.\S+/.test(user.email)) {
                Object.assign(fields_update, { email: user.email })
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Email must be valid and non-empty string."
                })
                return;
            }
        }

        if (user.phone_number) {
            if (typeof user.phone_number === "string") {
                Object.assign(fields_update, { phone_number: user.phone_number })
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Phone number must be a string."
                })
                return;
            }
        }

        if (user.profile_image) {
            if (typeof user.profile_image === "string") {
                Object.assign(fields_update, { profile_image: user.profile_image })
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Profile image must be string"
                })
                return;
            }
        }

        if (Object.values(fields_update).length === 0) {
            res.status(400).json({
                valid: false,
                message: "Nothing to update.",
            })
            return;
        }

        res.locals = { user: fields_update }
        next()
        return;
    } catch (error) {
        console.error("Error during update user:", error)
        res.status(500).json({ message: "An unexpected error occurred during udpate user validation." })
        return;
    }
} 