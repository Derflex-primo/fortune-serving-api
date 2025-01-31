import pool from "../../config";
import { User } from "../../../../@codegen";
import { Pagination } from "../../../../types";

export default async function get_users(pagination: Pagination): Promise<Omit<User, "password" | "password_hash">[]> {
    const client = await pool.connect();
    const { limit, order, next_page } = pagination;
    
    try {
        const query = `
              SELECT 
                  id, 
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
              ${next_page ? "WHERE id >= $1::uuid" : ""}
              ORDER BY id ${order}
              LIMIT ${next_page ? "$2" : "$1"};
        `;

        const values =  next_page ? [next_page, limit as number + 1] : [limit as number + 1];
        const results = await client.query(query, values);

        return results.rows
    } catch (error) {

        console.error("Transaction failed: get_all_users", error);
        throw error;

    } finally {
        client.release();
    }
}