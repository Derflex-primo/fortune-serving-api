import { Request, Response, NextFunction } from "express";

export default async function validate_get_user(req: Request, res: Response, next: NextFunction) {
    const { id }: { id: string } = req.body;

    try {
        if (!isNaN(Number(id))) {
            res.status(400).json({
                valid: false,
                message: "'id' must be a valid number.",
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