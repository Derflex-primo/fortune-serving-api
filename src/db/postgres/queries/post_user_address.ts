import pool from "../config";
import { Address } from "../../../@codegen";

export default async function post_user_address(id: string, address: Address): Promise<Address> {
    const client = await pool.connect();
    const current_timestamp = new Date().toISOString();

    try {

        const query = `
              INSERT INTO addresses (
                 user_id,
                 address_type,
                 street_address,
                 city,
                 postal_code,
                 country,
                 created_at,
                 updated_at 
              ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8
              ) RETURNING
                 id,
                 address_type,
                 street_address,
                 city,
                 postal_code,
                 country;
        `;

        const values = [
            id,
            address.address_type,
            address.street_address,
            address.city,
            address.postal_code,
            address.country,
            current_timestamp,
            current_timestamp
        ];

        const result = await client.query(query, values);

        return result.rows[0];
    } catch (error) {

        console.error("Transaction failed: post_user_address", error);
        throw error;

    } finally {
        client.release();
    }
}