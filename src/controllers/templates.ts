import { Request, Response, NextFunction } from "express";
import { Template } from "../@codegen";
import { ServiceTemplate } from "../services";

const service = new ServiceTemplate();

export async function handle_post_template(req: Request, res: Response, next: NextFunction) {
    const { template }: { template: Template } = req.body;

    try {
        const data = await service.post_template(template);

        if (!data) {
            res.status(409).json({
                status: "failed",
                message: "Template already exists.",
                data: data,
            })
            return;
        }

        res.status(201).json({
            status: "success",
            message: "Template added successfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
} 