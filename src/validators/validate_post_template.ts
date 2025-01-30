import { Request, Response, NextFunction } from "express";
import { Template } from "../@codegen";

export default async function validate_post_template(req: Request, res: Response, next: NextFunction) {
    const { template }: { template: Template } = req.body;

    try {
        if (!template) {
            res.status(400).json({
                valid: false,
                message: "Template object is required."
            })
            return;
        }

        if (!template.name || typeof template.name !== "string") {
            res.status(400).json({
                valid: false,
                message: "Template name is required and must be a non empty string"
            })
            return;
        }

        if (!template.description || typeof template.description !== "string") {
            res.status(400).json({
                valid: false,
                message: "Template description is required and must be a non empty string"
            })
            return;
        }

        if (!template.template_type || typeof template.template_type !== "string") {
            res.status(400).json({
                valid: false,
                message: "Template type is required and must be a non empty string"
            })
            return;
        }

        if (!template.thumbnail_image || typeof template.thumbnail_image !== "string") {
            res.status(400).json({
                valid: false,
                message: "Template thumbnail image is required and must be valid link"
            })
            return;
        }

        next()
        return;
    } catch (error) {
        console.error("Error during template validation:", error)
        res.status(500).json({ message: "An unexpected error occurred during template validation." })
        return;
    }
}