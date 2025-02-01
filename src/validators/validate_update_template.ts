import { Request, Response, NextFunction } from "express";
import { Template } from "../@codegen";

export default async function validate_update_template(req: Request, res: Response, next: NextFunction) {
    const { template }: { template: Partial<Template> } = req.body;

    try {
        if (!template) {
            res.status(400).json({
                valid: false,
                message: "Template object is required."
            })
            return;
        }

        let fields_update = {};

        if (template.name) {
            if (typeof template.name === "string") {
                Object.assign(fields_update, { name: template.name });
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Name must be a non-empty string."
                })
                return;
            }
        }

        if (template.description) {
            if (typeof template.description === "string") {
                Object.assign(fields_update, { description: template.description });
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Description must be a string."
                })
                return;
            }
        }

        if (template.version) {
            if (typeof template.version === "string") {
                Object.assign(fields_update, { version: template.version });
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Version must be a string."
                });
                return;
            }
        }

        if (template.template_type) {
            if (typeof template.template_type === "string") {
                Object.assign(fields_update, { template_type: template.template_type });
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Template type must be a string."
                })
                return;
            }
        }

        if (template.thumbnail_image) {
            if (typeof template.thumbnail_image === "string") {
                Object.assign(fields_update, { thumbnail_image: template.thumbnail_image });
            } else {
                res.status(400).json({
                    valid: false,
                    message: "Thumbnail image must be a string (URL)."
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

        res.locals = { template: fields_update }
        next()
        return;
    } catch (error) {
        console.error("Error during update template:", error)
        res.status(500).json({ message: "An unexpected error occurred during udpate template validation." })
        return;
    }
}