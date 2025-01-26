import { Address, User } from "../../../@codegen";
import pool from "../config";

export default async function get_user_with_addresses(id: string): Promise<(Omit<User, "password" | "password_hash"> & { addresses: Address[] }) | null> {
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

        if (result.rows.length === 0) {
            return null;
        }

        const user: Omit<User, "password" | "password_hash"> & { addresses: Address[] } = {
            id: result.rows[0].user_id,
            full_name: result.rows[0].full_name,
            phone_number: result.rows[0].phone_number,
            email: result.rows[0].email,
            date_of_birth: result.rows[0].date_of_birth,
            role: result.rows[0].role,
            is_verified: result.rows[0].is_verified,
            status: result.rows[0].status,
            subscription_type: result.rows[0].subscription_type,
            profile_image: result.rows[0].profile_image,
            addresses: result.rows
                .map(row => ({
                    id: row.address_id,
                    address_type: row.address_type,
                    street_address: row.street_address,
                    city: row.city,
                    postal_code: row.postal_code,
                    country: row.country,
                })),
        };

        return user;
    } catch (error) {

        console.error("Transaction failed: get_user", error);
        throw error;

    } finally {
        client.release();
    }
}