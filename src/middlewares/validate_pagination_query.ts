import { Request, Response, NextFunction } from "express";
import { Pagination } from "../types";

export default async function validate_pagination_query(req: Request, res: Response, next: NextFunction) {
    const { limit, order, next_page }: Partial<Pagination> = req.query;

    try {
        if (limit !== undefined && limit !== null) {
            if (isNaN(Number(limit))) {
                res.status(400).json({
                    valid: false,
                    message: "'limit' must be a valid number.",
                });
                return;
            };

            if (Number(limit) > 40) {
                res.status(400).json({
                    valid: false,
                    message: "'limit' must not exceed 40.",
                });
                return;
            };
        };

        if (order !== undefined && order !== null) {
            if (order !== "asc" && order !== "desc") {
                res.status(400).json({
                    valid: false,
                    message: "'order' must be either 'asc' or 'desc'.",
                });
                return;
            };
        };

        if (next_page !== undefined && next_page !== null) {
            if (isNaN(Number(next_page))) {
                res.status(400).json({
                    valid: false,
                    message: "'next_page' must be a valid number.",
                });
                return;
            };
        };

        next();
    } catch (error) {
        console.error("Error during pagination query validation:", error);
        res.status(500).json({
            message: "An unexpected error occurred during pagination query validation.",
        });
        return;
    }
}
