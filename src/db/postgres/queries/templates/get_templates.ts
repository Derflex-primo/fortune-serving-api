import pool from "../../config";
import { Template } from "../../../../@codegen";

export default async function get_templates(): Promise<Template[]> {
    const client = await pool.connect();

    try {
        const query = `
              SElECT
                id,
                name,
                description,
                version,
                template_type,
                thumbnail_image
              FROM templates
        `;

        const result = await client.query(query);

        return result.rows
    } catch (error) {

        console.error(error)
        throw error;

    } finally {
        client.release();
    }
}