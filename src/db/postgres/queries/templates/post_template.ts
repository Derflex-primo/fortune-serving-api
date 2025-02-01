import pool from "../../config";
import { Template } from "../../../../@codegen";

export default async function post_template(template: Template): Promise<Template> {
    const client = await pool.connect();
    const current_timestamp = new Date().toISOString();
    const version = "1";

    try {
        const query = `
              INSERT INTO templates (
                 name,
                 description,
                 version,
                 template_type,
                 thumbnail_image,
                 created_at,
                 updated_at
              ) VALUES (
                 $1, $2, $3, $4, $5, $6, $7
              ) RETURNING
                id,
                name,
                description,
                version,
                template_type,
                thumbnail_image;
        `;

        const values = [
            template.name,
            template.description,
            version,
            template.template_type,
            template.thumbnail_image,
            current_timestamp,
            current_timestamp
        ];

        const result = await client.query(query, values);

        return result.rows[0];
    } catch (error) {

        console.error("Transaction failed: post_template", error);
        throw error;

    } finally {
        client.release();
    }
}