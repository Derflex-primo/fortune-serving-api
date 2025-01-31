import { Template } from "../@codegen";
import { ServiceProtection } from "./index";
import { query_post_template } from "../db/postgres/queries";

export default class ServiceTemplate {
    private readonly protection: ServiceProtection;

    constructor() {
        this.protection = new ServiceProtection
    }

    /**
     * Creates a template in templates table.
     * @param template - The template object containing template details.
     * @returns - The created template object.
     */
    public async post_template(template: Template): Promise<Template | null> {
        try {
            const result = await query_post_template(template);

            return result;
        } catch (error) {
            console.error("Error creating template", error);
            return null;
        }
    }
}