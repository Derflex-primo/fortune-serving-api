import pool from "../config";
import { Address } from "../../../@codegen";

export default async function get_user_addresses(id: string): Promise<Address[]> {
    const client = await pool.connect();

    try {
        const query = `
              SELECT
                  id,
                  user_id,
                  address_type,
                  street_address,
                  city,
                  postal_code,
                  country
              FROM addresses
              WHERE user_id = $1;
        `;

        const result = await client.query(query, [id]);

        return result.rows;
    } catch (error) {

        console.error("Transaction failed: get_user_addresses", error);
        throw error;

    } finally {
        client.release();
    }
}