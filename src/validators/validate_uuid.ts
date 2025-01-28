import { Request, Response, NextFunction } from "express";

export default function validate_uuid(params: string[]) {
    const uuidv4 = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const param of params) {
                const value = req.params[param];

                if (!value) {
                    res.status(400).json({
                        valid: false,
                        message: `'${param}' is required.`,
                    })
                    return;
                }

                if (!uuidv4.test(value)) {
                    res.status(400).json({
                        valid: false,
                        message: `'${param}' must be a valid uuid.`,
                    })
                    return;
                }
            }

            next()
            return;
        } catch (error) {
            console.error("Error during uuid validation:", error);
            res.status(500).json({
                message: "An unexpected error occurred during uuid validation.",
            })
            return;
        }
    };
}