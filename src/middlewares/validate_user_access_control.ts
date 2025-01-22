import { Request, Response, NextFunction } from "express";
import { User } from "../@codegen";

export default function validate_user_access_control(access_control: User['role'][]) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const { user }: { user: Partial<User> } = req.body;

        try {
            if (user && user.role && access_control.includes(user.role)) {
                next();
                return;
            }
            res.send(401).json({ message: "Forbidden, insufficient permissions." });
            return;
        } catch (error) {
            console.error("Error during user access control validation:", error);
            res.status(500).json({ message: "An unexpected error occurred during user access control validation." });
            return;
        }
    }
}