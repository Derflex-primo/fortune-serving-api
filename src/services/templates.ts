import { Template } from "../@codegen";
import { ServiceProtection } from "./index";
import { query_post_template, query_get_templates, query_get_template, query_update_template} from "../db/postgres/queries";

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

    /**
     * Returns template details.
     * @param id - uuid format to identify which template to fetch.
     * @returns Template details.
     */
    public async get_template(id: string): Promise<Template | null> {
        try {
            const result = query_get_template(id);

            return result;
        } catch (error) {
            console.error("Error returning templates", error);
            return null;
        }
    }

    /**
     * Updates templates details.
     * @param id - uuid format to identify which template to update.
     * @param template  - The template details object to be udpate.
     * @returns The updated templates details.
     */
    public async update_template(id: string, template: Template): Promise<Template | null> {
        try {
            const result = await query_update_template(id, template);

            return result;
        } catch (error) {
            console.error("Error updating templates", error);
            return null;
        }
    }
}