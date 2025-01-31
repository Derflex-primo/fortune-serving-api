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
            message: "Template created successfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}

export async function handle_get_templates(req: Request, res: Response, next: NextFunction) {
    try {
        const data = await service.get_templates();

        if (!data || data.length === 0) {
            res.status(200).json({
                status: "success",
                message: "No templates found.",
                data: data
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Templates fetched successfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }

}

export async function handle_get_template(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
        const data = await service.get_template(id);

        if (!data) {
            res.status(404).json({
                status: "failed",
                message: "Template not found.",
                data: data
            })
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Template fetched successfully.",
            data: data
        })
        return;
    } catch (error) {
        console.error(error)
        next(error)
        return;
    }
}