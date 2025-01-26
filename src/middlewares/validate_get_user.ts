import { Request, Response, NextFunction } from "express";

export default async function validate_get_user(req: Request, res: Response, next: NextFunction) {
    const { id }= req.params;
    const uuidv4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

    try {
        if (!id) {
            res.status(400).json({
                valid: false,
                message: "'id' is required.",
            })
            return;
        }

        if (!uuidv4.test(id)) {
            res.status(400).json({
                valid: false,
                message: "'id' must be a valid uuid.",
            })
            return;
        }
        next()
        return;
    } catch (error) {
        console.error("Error during get user validation:", error);
        res.status(500).json({
            message: "An unexpected error occurred during get user validation.",
        })
        return;
    }
}