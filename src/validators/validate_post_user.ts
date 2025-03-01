import { Request, Response, NextFunction } from "express";
import { UserRegistration } from "../types";
import validate_user_object from "./validate_user_object";

export default function validate_post_user(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: Partial<UserRegistration> } = req.body;

    try {
        const validation = validate_user_object(user)

        if (!validation.valid) {
            res.status(400).json({ valid: validation.valid, message: validation.message })
            return;
        }

        next()
        return;
    } catch (error) {
        console.error("Error during user validation:", error)
        res.status(500).json({ message: "An unexpected error occurred during user validation." })
        return;
    }
}