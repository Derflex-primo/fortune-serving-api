import pool from "../../config";
import { User } from "../../../../@codegen";

export default async function update_user(id: string, user: Partial<Omit<User, "password" | "password_hash">>) {
    const client = await pool.connect();

    try {
        const keys = Object.keys(user);
        const values = Object.values(user);
        const set = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

        const query = `
              UPDATE users
              SET ${set}
              WHERE id = $${keys.length + 1}
              RETURNING ${keys.join(", ")}
        `;

        values.push(id);

        const result = await client.query(query, values);

        return result.rows[0];
    } catch (error) {

        console.error("Transaction failed: update_user", error);
        throw error;

    } finally {
        client.release();
    }
}