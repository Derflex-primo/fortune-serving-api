import { Template } from "../@codegen";
import ServiceProtection from "./protection";

export default class ServiceTemplate {
    private readonly protection: ServiceProtection;

    constructor() {
        this.protection = new ServiceProtection
    }

    public async post_template(template: Template): Promise<Template | null> {
        return null;
    }
}