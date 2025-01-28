import { Request, Response, NextFunction } from "express";
import { Address } from "../@codegen";

export default async function validate_addresses(req: Request, res: Response, next: NextFunction) {
    const { address }: { address: Address } = req.body;

    try {

        if (!address) {
            res.status(400).json({
                valid: false,
                message: "Addresses object is required."
            })
            return;
        }

        if (!address.address_type || typeof address.address_type !== "string") {
            res.status(400).json({
                valid: false,
                message: "Each address must include a valid address type."
            })
            return;
        }

        if (!address.street_address || typeof address.street_address !== "string") {
            res.status(400).json({
                valid: false,
                message: "Each address must include a valid street address."
            })
            return;
        }

        if (!address.city || typeof address.city !== "string") {
            res.status(400).json({
                valid: false,
                message: "Each address must include a valid city."
            })
            return;
        }

        if (!address.postal_code || typeof address.postal_code !== "string") {
            res.status(400).json({
                valid: false,
                message: "Each address must include a valid postal code."
            })
            return;
        }

        if (!address.country || typeof address.country !== "string") {
            res.status(400).json({
                valid: false,
                message: "Each address must include a valid country."
            })
            return;
        }

        next()
        return;
    } catch (error) {
        console.error("Error during addresses validation:", error);
        res.status(500).json({
            message: "An unexpected error occurred during addresses validation.",
        })
        return;
    }
} 