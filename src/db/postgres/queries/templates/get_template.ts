import pool from "../../config";
import { Template } from "../../../../@codegen";

export default async function get_template(id: string): Promise<Template> {
    const client = await pool.connect();

    try {
        const query = `
              SELECT 
                id,
                name,
                description,
                version,
                template_type,
                thumbnail_image
              FROM templates
              WHERE id = $1
        `;

        const result = await client.query(query, [id]);

        return result.rows[0];
    } catch (error) {

        console.error("Transaction failed: get_template", error);
        throw error;

    } finally {
        client.release();
    }
}