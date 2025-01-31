import { Template } from "../@codegen";
import { ServiceProtection } from "./index";
import { query_post_template, query_get_templates } from "../db/postgres/queries";

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

    /**
     * Returns a set of templates.
     * @requires pagination must be done here, as of now, for mvp purposes i believe we dont have so much template to offer either.
     * @returns A set of templates, non paginated. 
     */
    public async get_templates(): Promise<Template[] | null> {
        try {
            const result = await query_get_templates();

            return result;
        } catch (error) {
            console.error("Error returning templates", error);
            return null;
        }
    }
}