import pool from "../config";
import { User } from "../../../@codegen";
import { Pagination } from "../../../types";

export default async function get_all_users_with_pagination(pagination: Pagination): Promise<Omit<User, "password" | "password_hash">[]> {
    const client = await pool.connect();
    const { limit, order, next_page } = pagination;

    try {

        const query = `
              SELECT id, 
                     full_name, 
                     phone_number, 
                     email, 
                     date_of_birth, 
                     role, 
                     is_verified, 
                     status,
                     subscription_type,
                     profile_image
              FROM users
              WHERE id >= $1
              ORDER BY id ${order}
              LIMIT $2;
        `;

        const values = [next_page, limit as number + 1];
        const results = await client.query(query, values);

        return results.rows
    } catch (error) {

        console.error("Transaction failed:", error);
        throw error;

    } finally {
        client.release();
    }
}