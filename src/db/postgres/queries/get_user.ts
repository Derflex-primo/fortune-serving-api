import { Address, User } from "../../../@codegen";
import pool from "../config";

export default async function get_user(id: string): Promise<(Omit<User, "password" | "password_hash"> & Address & { address_id: string })[] | null> {
    const client = await pool.connect();

    try {

        const query = `
              SELECT 
                  u.id, 
                  u.full_name, 
                  u.phone_number, 
                  u.email, 
                  u.date_of_birth, 
                  u.role, 
                  u.is_verified, 
                  u.status,
                  u.subscription_type,
                  u.profile_image,
                  a.id as address_id,
                  a.address_type,
                  a.street_address,
                  a.city,
                  a.postal_code,
                  a.country
              FROM users u
              LEFT JOIN addresses a ON u.id = a.user_id
              WHERE u.id = $1
        `;

        const result = await client.query(query, [id]);

        return result.rows
    } catch (error) {

        console.error("Transaction failed: get_user", error);
        throw error;

    } finally {
        client.release();
    }
}