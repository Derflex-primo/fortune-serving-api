import pool from "../../config";
import { Template } from "../../../../@codegen";

export default async function update_template(id: string, template: Template): Promise<Template> {
    const client = await pool.connect();

    try {
        const keys = Object.keys(template);
        const values = Object.values(template)
        const set = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

        const query = `
              UPDATE templates
              SET ${set}
              WHERE id = $${keys.length + 1}
              RETURNING ${keys.join(", ")}
        `;

        values.push(id);

        const result = await client.query(query, values);

        return result.rows[0];
    } catch (error) {

        console.error("Transaction failed: update_template", error);
        throw error;

    } finally {
        client.release();
    }
}