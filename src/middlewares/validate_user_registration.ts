import { Request, Response, NextFunction } from "express";
import { User } from "../@codegen";
import { validate_user_object } from "../utils";

export default function validate_user_registration(req: Request, res: Response, next: NextFunction) {
    const { user }: { user: Partial<User> } = req.body;

    try {
        const validation = validate_user_object(user)

        if (!validation.valid) {
            res.status(400).json({ message: validation.message })
            return;
        }

        next();
        return;
    } catch (error) {
        console.error("Error during user validation:", error);
        res.status(500).json({ message: "An unexpected error occurred during user validation." });
        return;
    }
}